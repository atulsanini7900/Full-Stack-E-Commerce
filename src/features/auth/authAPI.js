// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise(async (resolve) =>{
    const response = await fetch("https://api.example.com/data");
    const result = await response.json()
    resolve({result})
  }
  );
}


// export async function fetchCount(amount = 1) {
//   try {
//     const response = await fetch("https://api.example.com/data"); // replace with your actual URL
//     const result = await response.json();
//     return { result };
//   } catch (error) {
//     console.error("Fetch error:", error);
//     return { error: "Failed to fetch data" };
//   }
// }