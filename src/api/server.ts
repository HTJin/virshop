const token = `${process.env.REACT_APP_USER_TOKEN}`;
const fireToken = localStorage.getItem("user_token");

export const serverCalls = {
  // get: async (fileName: string) => {
  //   console.log(`Fetching transformed data for ${fileName}`);
  //   const response = await fetch(
  //     `https://virshop-server.glitch.me/api/transform/${fireToken}/${fileName}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "x-access-token": `Bearer ${token}`,
  //       },
  //     }
  //   );
  //   if (!response.ok) {
  //     throw new Error("Failed to fetch data from server");
  //   }
  //   return await response.json();
  // },
  upload: async (file: any, fileName: string) => {
    console.log(`Uploading ${fileName}`);
    const formData = new FormData();
    formData.append("csv", file);
    const response = await fetch(
      `https://virshop-server.glitch.me/api/upload/${fireToken}/${fileName}`,
      {
        method: "POST",
        headers: {
          "x-access-token": `Bearer ${token}`,
        },
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error("Failed to upload file to server");
    }
    return await response.json();
  },
};
