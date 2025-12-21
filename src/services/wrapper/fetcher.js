export async function fetcher(url, options = {}) {
  try {
    const res = await fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        "content-type": "application/json",
        ...(options.headers || {}),
      },
    });

    const data = await res.json();

    if (!res.ok) {
      const err = data.message;
      throw err;
    }

    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
