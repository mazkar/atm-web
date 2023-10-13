import Axios from 'axios';
import constants from '../constants';
import secureStorage from '../secureStorage';
const { userServiceBaseUrl } = constants;

function getUsers(paramObj) {
  const {
    rowsPerPage,
    currentPage,
    orderDirection = 'ASC',
    sortBy = 'fullName',
    divisionId,
    roleId,
  } = paramObj;
  const rowParam = rowsPerPage ? 'rowPerPage=' + rowsPerPage : '';
  const curParam = currentPage || currentPage * 1 === 0 ? '&currentPage=' + currentPage : '';
  const divisionParam = divisionId ? '&divisionId=' + divisionId : '';
  const orderDirUp = orderDirection ? orderDirection.toUpperCase() : 'ASC';
  const roleParam = roleId ? '&roleId=' + roleId : '';
  return Axios({
    method: 'GET',
    url: `${userServiceBaseUrl}/users?${rowParam}${curParam}&orderDirection=${orderDirUp}&ordersBy=${sortBy}${roleParam}${divisionParam}`,
    headers: {
      Authorization: 'Bearer ' + secureStorage.getItem('access_token'),
    },
  });
}

function getRoles(paramObj) {
  const {
    orderDirection = 'ASC',
    ordersBy = 'name',
    rowPerPage = 10,
    currentPage = 0,
  } = paramObj ? paramObj : {};
  const urlParams = `?rowPerPage=${rowPerPage}&currentPage=${currentPage}&searchString=&orderDirection=${orderDirection.toUpperCase()}&ordersBy=${ordersBy}`;
  return Axios({
    method: 'GET',
    url: `${userServiceBaseUrl}/roles${paramObj ? urlParams : ''}`,
    headers: {
      Authorization: 'Bearer ' + secureStorage.getItem('access_token'),
    },
  });
}

function getMenus(paramObj) {
  const { currentPage, orderDirection } = paramObj ? paramObj : {};
  const path = paramObj
    ? `?rowPerPage=10&currentPage=${currentPage}&searchString=&orderDirection=${orderDirection.toUpperCase()}&ordersBy=name`
    : '/hierarchy';
  return Axios({
    method: 'GET',
    url: `${userServiceBaseUrl}/menus${path}`,
    headers: {
      Authorization: 'Bearer ' + secureStorage.getItem('access_token'),
    },
  });
}

function useMenuArr(menuArr) {
  // menuArr = menus props of the role
  function getUserAccess(id) {
    // id = menu ID retreived from menu API
    return menuArr?.find(({ menuId }) => menuId === id)?.userAccess;
  }
  return { getUserAccess };
}

export { getUsers, getRoles, getMenus, useMenuArr };
