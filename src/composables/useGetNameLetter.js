
export const useGetNameLetter = (name) => {
  // console.log(name)
  const myArray = name.split(" ");
  if(myArray.length > 1) {
    return `${myArray[0].charAt(0)}${myArray[1].charAt(0)}`
  }else {
    return `${myArray[0].charAt(0)}`
  }

}
