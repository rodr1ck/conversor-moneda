const callApi = async () => {
    try {
      var requestOptions = {
        method: "GET"
      };
  
      const res = await fetch(
        "https://mindicador.cl/api",
        requestOptions
      );
  
      console.log("res: ", res);
  
      if (!res.ok) throw new Error(res.text);
      const json = await res.json();
  
      return { success: true, data: json };
    } catch (e) {
      console.error(e);
      return { success: false, data: [] };
    }
  };
  
  export default callApi;
  