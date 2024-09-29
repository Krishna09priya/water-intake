import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userWater_intakes: JSON.parse(localStorage.getItem('userWater_intakes')) || {},
};

const waterintakeSlice = createSlice({
  name: 'water_intakes',
  initialState,
  reducers: {
    addWater_Intake: (state, action) => {
      const { userId, water_intake } = action.payload;

      if (!state.userWater_intakes[userId]) {
        state.userWater_intakes[userId] = [];
      }

      // Adjusting for IST timezone (UTC+5:30)
      const currentDate = new Date();
      const ISTDate = new Date(currentDate.getTime() + (330 * 60 * 1000)); // IST is UTC+5:30
      const localToday = `${ISTDate.getUTCFullYear()}-${String(ISTDate.getUTCMonth() + 1).padStart(2, '0')}-${String(ISTDate.getUTCDate()).padStart(2, '0')}`;

      const hasEntryForToday = state.userWater_intakes[userId].some(
        (entry) => new Date(entry.addedtime).toISOString().split('T')[0] === localToday
      );

      if (!hasEntryForToday) {
        const newIntake = { ...water_intake, addedtime: ISTDate.toISOString() };
        state.userWater_intakes[userId].push(newIntake);
        localStorage.setItem('userWater_intakes', JSON.stringify(state.userWater_intakes));
      }
    },
    updateWater_Intake: (state, action) => {
      const { userId, water_intake } = action.payload;

      if (state.userWater_intakes[userId]) {
        const index = state.userWater_intakes[userId].findIndex((water) => water.id === water_intake.id);
        if (index !== -1) {
          state.userWater_intakes[userId][index] = { ...water_intake, addedtime: state.userWater_intakes[userId][index].addedtime }; // Preserve the original addedtime
          localStorage.setItem('userWater_intakes', JSON.stringify(state.userWater_intakes));
        }
      }
    },
    deleteWater_Intake: (state, action) => {
      const { userId, water_intakeId } = action.payload;

      if (state.userWater_intakes[userId]) {
        state.userWater_intakes[userId] = state.userWater_intakes[userId].filter((water) => water.id !== water_intakeId);
        localStorage.setItem('userWater_intakes', JSON.stringify(state.userWater_intakes));
      }
    },
  },
});

export const { addWater_Intake, updateWater_Intake, deleteWater_Intake } = waterintakeSlice.actions;
export default waterintakeSlice.reducer;
