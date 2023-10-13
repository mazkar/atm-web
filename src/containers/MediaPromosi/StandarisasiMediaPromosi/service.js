import axios from "axios";
import secureStorage from "../../../helpers/secureStorage";

const baseUrl = process.env.REACT_APP_API_MONITORING;
const accessToken = secureStorage.getItem("access_token");
const headersSetting = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: `Bearer ${accessToken}`,
};

export const doGetCategoryMediaPromosi = async (loaderHandler) => {
  loaderHandler(true);
  try {
    const result = await axios({
      method: "GET",
      url: `${baseUrl}/getCategoryMediaPromosi`,
      headers: headersSetting,
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`error while get category media promosi\n${error}`);
    loaderHandler(false);
  }
};

export const doAddCategoryMediaPromosi = async (
  loaderHandler,
  categoryName
) => {
  loaderHandler(true);
  try {
    const result = await axios({
      method: "POST",
      url: `${baseUrl}/saveAndUpdateCategoryMediaPromosi`,
      headers: headersSetting,
      data: {
        categoryName: categoryName,
      },
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`error while add category standarisasi media promosi\n${error}`);
    loaderHandler(false);
  }
};

export const doEditCategoryMediaPromosi = async (
  loaderHandler,
  id,
  categoryName
) => {
  loaderHandler(true);
  try {
    const result = await axios({
      method: "POST",
      url: `${baseUrl}/saveAndUpdateCategoryMediaPromosi`,
      headers: headersSetting,
      data: {
        id: id,
        categoryName: categoryName,
      },
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`error while edit category standarisasi media promosi\n${error}`);
    loaderHandler(false);
  }
};

export const doDeleteCategoryMediaPromosi = async (loaderHandler, id) => {
  loaderHandler(true);
  try {
    const result = await axios({
      method: "POST",
      url: `${baseUrl}/removeCategoryMediaPromosi`,
      headers: headersSetting,
      data: {
        id: id,
      },
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`error while delete category standarisasi media promosi\n${error}`);
    loaderHandler(false);
  }
};
