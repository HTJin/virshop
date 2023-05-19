const token = `${process.env.REACT_APP_USER_TOKEN}`;
const fireToken = localStorage.getItem("user_token");

export const serverCalls = {
  get: async () => {
    const response = await fetch(
      `https://virshop-server.glitch.me/api/upload/${fireToken}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data from server");
    }
    return await response.json();
  },
  create: async (data: any = {}) => {
    const response = await fetch(
      `https://virshop-server.glitch.me/api/upload/${fireToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to create new data on server");
    }
    return await response.json();
  },
  update: async (file_name: string, data: any = {}) => {
    const response = await fetch(
      `https://virshop-server.glitch.me/api/upload/${file_name}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update data on server");
    }
  },
  delete: async (file_name: string) => {
    const response = await fetch(
      `https://virshop-server.glitch.me/api/upload/${file_name}/remove`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to delete pull sheet: ${file_name}`);
    }
  },
};
