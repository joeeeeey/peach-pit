export default (state = {}, action) => {
  console.log(`store action here ${action.type}`)
  
  switch (action.type) {
    case 'replace':
      state = action.payload
      return state
    case 'update':
      let nestedKey = action.payload.nestedKey
      let value = action.payload.value
      "(0){div}(1){EditableTextArea},props,content"
      let keys = nestedKey.split(',')
      let connectKeys = ""
      for(let i=0; i<keys.length; i++){
        connectKeys += `['${keys[i]}']`
      }
      console.log(value)
      console.log(`state${connectKeys}=value`)
      eval(`state${connectKeys}=value`)
      console.log(state)
      return state
    default:
      return state
  }
}
