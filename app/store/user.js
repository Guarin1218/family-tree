export const state = () => ({
    id: 0,
    name:"",
    idM:0,
    idP:0,
})

export const mutations={
    storeId:(state,data)=>{
        state.id=data
    },
    storeName:(state,data)=>{
        state.name=data
    },
    storeIdM:(state,data)=>{
        state.idM=data
    },
    storeIdP:(state,data)=>{
        state.idP=data
    },
  
}