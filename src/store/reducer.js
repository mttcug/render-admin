import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuToggle: false
};

// 异步请求的方法
export const incrementAsync = createAsyncThunk(
  "counter/fetchCount", //请求的接口地址
  async amount => {
    //amount 为请求的参数
    const response = {}; //接收请求的响应数据
    // 这个返回值，将会在 fulfilled 成功状态的 action.payload 中获取
    return response.data;
  }
);

export const { reducer, actions } = createSlice({
  name: "actionSlice", //slice的名字
  initialState, //初始化数据
  // 定义reducers
  reducers: {
    menuToggleAction: state => {
      // 集成了Immer库，它检测到“draft state"”的更改并生成一个全新的
      state.menuToggle = !state.menuToggle;
    },
    decrement: (state, action) => {
      state.value -= 1;
    },
    //调用方法传入的参数都在action.payload属性中
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  },
  // 额外的reducer,用来处理异步请求方法
  extraReducers: builder => {
    builder
      .addCase(incrementAsync.pending, state => {
        //pending请求过程中
        state.status = "loading"; //设置loading
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        //fulfilled请求完成
        state.status = "idle"; //取消loading
        state.value += action.payload; //将请求的响应数据设置到slice中
        //action.payload就是上面incrementAsync方法return出来的响应数据
      })
      .addCase(incrementAsync.rejected, (state, action) => {
        //rejected请求拒绝
      });
  }
});

export const { menuToggleAction, decrement, incrementByAmount } = actions;
export default reducer;
