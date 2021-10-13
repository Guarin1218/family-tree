export const state = () => ({
    count: 0
})

export const mutations={
    storeCount:(state,data)=>{
        state.count=data
    }
}