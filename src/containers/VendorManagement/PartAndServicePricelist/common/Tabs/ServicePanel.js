/* eslint-disable react/jsx-no-bind */
/* External Import */
import React, {useState, useEffect, useImperativeHandle, forwardRef} from 'react';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

/* Internal Import */
import { ChkyTablePagination } from "../../../../../components";
import FilterProgress from '../FilterProgress';
import TableTemplateService from "../TableTemplate/ServicePricelist";
import { deletePricelistService, fetchPricelistService } from "../../../ApiServices";
import { ReactComponent as EditIcon } from "../../../../../assets/images/edit.svg";
import MenuPopUp from "../MenuPopUp";
import EditForm from "../EditPricelistPopUp";
import DeletePopUp from "../../../../../components/Alert/Warning";
import useRupiahConverterSecondary from "../../../../../helpers/useRupiahConverterSecondary";
import numeral from 'numeral';

const rowsPerPage = 10;

const ServicePanel =  forwardRef((props,ref) => {
  const {currentTabs} = props;
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [vendorId, setVendorId] = useState(null);
  const [currentData, setCurrentData] = useState({});
  const [searchInput, setSearchInput] = useState("")
  const [selectInput, setSelectInput] = useState("")
  const [renderPage, setRenderPage] = useState(false)
  const [dialog, setDialog] = useState({
    edit: false,
    delete: false,
  });
  const [tableServiceConfig, setTableServiceConfig] = useState({
    orderDirection: "ASC",
    totalPages: 0,
    totalRows: 0,
    sortBy: null
  });
  const [dataRequest, setDataRequest] = useState({
    pageNumber: 0,
    dataPerPage: rowsPerPage,
    sortBy: "priceListId",
    sortType: "ASC",
  });

  const itemSearch = [
    {
      text: "Pricelist ID",
      value: "priceListId"
    },
    {
      text: "Nama Vendor",
      value: "vendorName"
    },
    {
      text: "Jenis Jasa",
      value: "jenisJasa"
    },
    {
      text: "Biaya Jasa",
      value: "biayaJasa"
    },
  ];

  const handleCurrentData = () => {
    const obj = data.find(item => item.priceListId === currentId);
    setCurrentData(obj);
    console.log(currentData);
  };

  const handleDialog = (key, value, id, idVendor) => {
    setDialog(prev => ({
      ...prev,
      [key]: value
    }));

    if(id){
      setCurrentId(id);
    }

    if(idVendor){
      setVendorId(idVendor);
    }
  };

  const onSelectFilter = (e) => {
    setSelectInput(e)
  }

  function handleChangePageService(newPage){
    setDataRequest((prev)=>({
      ...prev,
      pageNumber:newPage
    }));
  }

  const onChangeSearch = (e) => {
    setSearchInput(e.target.value)
  }

  const onResetFilter = () => {
    setSearchInput("")
    setSelectInput("")
    setRenderPage(!renderPage)
  }

  const onSubmitFilter = () => {
    console.log(selectInput)
    console.log(searchInput)
    setRenderPage(!renderPage)
  }

  const handleSortService = (property) => {
    return function actualFn(e) {
      const isActiveAndAsc = tableServiceConfig.sortBy === property && tableServiceConfig.orderDirection === "ASC";
      const sortByNewVal =
        TableTemplateService.columnNameVar[TableTemplateService.titleTable.indexOf(property)];
      const sortType = isActiveAndAsc ? "DESC" : "ASC";
      setTableServiceConfig((prevValue) => ({
        ...prevValue,
        orderDirection: sortType,
        sortBy: property,
        dataRequest: {
          ...tableServiceConfig.dataRequest,
          sortType,
          sortBy: sortByNewVal
        }
      }));
      setDataRequest({
        ...dataRequest,
        sortBy: sortByNewVal,
        sortType: sortType,
      })
    };
  };

  const handleLoading = (value) => {
    setLoading(value);
  };

  const handleDelete = async () => {
    const payload = {
      id: currentId
    };
    const res = await deletePricelistService(payload);
    if(res){
      fetchDataService();
      handleDialog("delete", false);
    }

  };

  const fetchDataService = async () => {
    setCurrentId(null)
    let res;
    if(selectInput && searchInput) {
      res = await fetchPricelistService(handleLoading, dataRequest, selectInput, searchInput);
    } else {
      res = await fetchPricelistService(handleLoading, dataRequest);
    }
    if(res){
      const {content, totalPages, totalElements} = res;
      const tempArray = content.map(item => {
        const {vendorId:currentVendorId, priceListId, vendorName, jenisJasa, biayaJasa} = item;
        return {
          priceListId,
          vendorName,
          jenisJasa,
          biayaJasa: `Rp ${numeral(biayaJasa).format("0,0")}`,
          action: <MenuPopUp itemId={priceListId} editHandler={handleDialog} deleteHandler={handleDialog} vendorId={currentVendorId} />
        };
      });
      setTableServiceConfig(prev => {
        return {
          ...prev,
          totalPages,
          totalRows: totalElements,
        };
      });
      setData(tempArray);
    }
  };

  useEffect(()=>{
    handleCurrentData();
  },[currentId]);

  useEffect(() => {
    fetchDataService();
  },[dataRequest, renderPage]);

  useImperativeHandle(ref, () => ({
    handleRefreshService: () => fetchDataService()
  }),[]);

  return (
    <>
      <FilterProgress selectedSearch={selectInput} onSubmit={onSubmitFilter} inputSearch={searchInput} onResetFilter={onResetFilter} onChangeInputSearch={onChangeSearch} itemSearch={itemSearch} onSelect={onSelectFilter} isOpening={false} />
      <ChkyTablePagination
        isLoadData={isLoading}
        data={data}
        fields={TableTemplateService.titleTable}
        cellOption={TableTemplateService.valueType}
        isSort={TableTemplateService.isSort}
        changePage={handleChangePageService}
        rowsPerPage={rowsPerPage}
        handleSort={handleSortService}
        totalPages={tableServiceConfig.totalPages}
        totalRows={tableServiceConfig.totalRows}
        sortBy={tableServiceConfig.sortBy}
        order={tableServiceConfig.orderDirection}
        isUsingMuiSort
        leftAlignHeaders={[0, 1, 2, 3, 4]}
        leftAlignBody={[0, 1, 2, 3, 4]}
      />
      {
        dialog.edit &&
        <EditForm
          isOpen={dialog.edit}
          onClose={() => {handleDialog('edit', false);}}
          currentData={currentData}
          refresh={fetchDataService}
          vendorId={vendorId}
          currentTabs={currentTabs}
        />
      }
      <DeletePopUp
        isOpen={dialog.delete}
        title="Anda yakin ingin Melakukan Delete ?"
        subTitle="Anda tidak dapat membatalkan tindakan ini"
        onClose={() => {handleDialog('delete', false);}}
        onConfirm={() => handleDelete()}
      />
    </>
  );
});

export default ServicePanel;
