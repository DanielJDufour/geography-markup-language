export default function chunk(arr, chunkSize = 2) {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = [];
    for (let c = 0; c < chunkSize; c++) {
      chunk.push(arr[i + c]);
    }
    result.push(chunk);
  }
  return result;
}
