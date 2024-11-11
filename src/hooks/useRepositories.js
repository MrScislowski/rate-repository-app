import { useEffect, useState } from "react";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://192.168.0.133:5001/api/repositories"
        // POWERSHELL:
        // Get-NetIPConfiguration | Where-Object { $_.InterfaceAlias -eq "Wi-Fi"} | Select-Object -Property IPv4Address
        // MAC:
        // ifconfig | grep 192.160.0
      );
      const responseData = await response.json();
      console.log(responseData);
      setRepositories(responseData);
      setLoading(false);
    } catch (e) {
      console.log("Could not fetch repositories; error below");
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
