import axios from "axios";

const api_url = "https://api-open-source-astrology.onrender.com/";

export const get_projects = async (search, user_id) => {
  const result = await axios.get(
    `${api_url}project?search=${search}&user_id=${user_id}`
  );
  return result.data;
};
