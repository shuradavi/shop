import { createSlice } from "@reduxjs/toolkit";
import { STATUS_MAP } from "../Params/Params";
import { getProductInfo } from "../components/API/get";
import { calcCashbackSize, calcPriceWithDiscount } from "../functions/functions";

const currentProductSlice = createSlice({
	name: 'product',
	initialState: {
		product: {},
		status: null,
		error: null,
	},
	reducers: {
		fetchStart: (state) => {
			state.status = STATUS_MAP.pending
		},
		fetchSuccess: (state, action) => {
			if (state.status = STATUS_MAP.pending) {
				state.product = action.payload
				state.status = STATUS_MAP.fulfilled
				let newObj = {};
				state.product["hasDiscount"] ?
					newObj =
					{	...state.product,
						"priceWithDiscount": calcPriceWithDiscount(state.product),
						"cashbackSize": calcCashbackSize(state.product)
					} :
					newObj = { ...state.product }
				state.product = newObj;
			}
		},
		fetchFail: (state, action) => {
			state.status = STATUS_MAP.rejected
			state.error = action.payload
			console.log('Error: ', action.payload);
		}
	}
})

export const { fetchStart, fetchSuccess, fetchFail } = currentProductSlice.actions
export default currentProductSlice.reducer
export const fetchProductById = (id) => async (dispatch) => {
	try {
		dispatch(fetchStart())
		const response = await getProductInfo(id)
		dispatch(fetchSuccess(response.data))
	} catch (error) {
		dispatch(fetchFail(error))
	}
}