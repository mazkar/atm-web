/* eslint-disable react/jsx-no-bind */
/* External import */
import React, {useState, useEffect, useImperativeHandle, forwardRef} from 'react';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

/* Internal import */
import { ChkyTablePagination } from "../../../../../components";
import FilterProgress from '../FilterProgress';
import TableTemplatePart from "../TableTemplate/PartPricelist";
import { deletePricelistPart, fetchPricelistPart } from "../../../ApiServices";
import { ReactComponent as EditIcon } from "../../../../../assets/images/edit.svg";
import MenuPopUp from "../MenuPopUp";
import EditForm from "../EditPricelistPopUp";
import DeletePopUp from "../../../../../components/Alert/Warning";
import useRupiahConverterSecondary from "../../../../../helpers/useRupiahConverterSecondary";
import numeral from 'numeral';

const rowsPerPage = 10;

const PartPanel = forwardRef((props,ref) => {
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
  const [tablePartConfig, setTablePartConfig] = useState({
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
      text: "Nama Barang",
      value: "namaBarang"
    },
    {
      text: "Merek",
      value: "merek"
    },
    {
      text: "Harga Barang",
      value: "hargaBarang"
    },
    {
      text: "Biaya Jasa Pemasangan",
      value: "hargaJasaPemasangan"
    }
  ];

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

  const handleChangePagePart = (newPage) =>{
    setDataRequest((prev)=>({
      ...prev,
      pageNumber:newPage
    }));
  };

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

  const handleSortPart = (property) => {
    return function actualFn(e) {
      const isActiveAndAsc = tablePartConfig.sortBy === property && tablePartConfig.orderDirection === "ASC";
      const sortByNewVal =
        TableTemplatePart.columnNameVar[TableTemplatePart.titleTable.indexOf(property)];
      const sortType = isActiveAndAsc ? "DESC" : "ASC";
      setTablePartConfig((prevValue) => ({
        ...prevValue,
        orderDirection: sortType,
        sortBy: property,
        dataRequest: {
          ...tablePartConfig.dataRequest,
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

  const handleCurrentData = () => {
    const obj = data.find(item => item.priceListId === currentId);
    setCurrentData(obj);
  };

  const handleDelete = async () => {
    const payload = {
      id: currentId
    };
    const res = await deletePricelistPart(payload);
    if(res){
      fetchDataPart();
      handleDialog("delete", false);
    }

  };

  const fetchDataPart = async () => {
    setCurrentId(null)
    let res;
    if(selectInput && searchInput) {
      res = await fetchPricelistPart(handleLoading, dataRequest, selectInput, searchInput);
    } else {
      res = await fetchPricelistPart(handleLoading, dataRequest);
    }
    console.log(res);
    if(res){
      const {content, totalPages, totalElements} = res;
      const tempArray = content.map(item => {
        const {vendorId:currentVendorId, priceListId, vendorName, namaBarang, merek, hargaBarang, hargaJasaPemasangan} = item;
        return {
          priceListId,
          vendorName,
          namaBarang,
          merek,
          hargaBarang: `Rp ${numeral(hargaBarang).format("0,0")}`,
          hargaJasaPemasangan: `Rp ${numeral(hargaJasaPemasangan).format("0,0")}`,
          action: <MenuPopUp itemId={priceListId} editHandler={handleDialog} deleteHandler={handleDialog} vendorId={currentVendorId} />,
        };
      });
      setTablePartConfig(prev => {
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
    fetchDataPart();
  },[dataRequest, renderPage]);

  useImperativeHandle(ref, () => ({
    handleRefreshPart: () => fetchDataPart()
  }),[]);

  return (
    <>
      <FilterProgress selectedSearch={selectInput} onSubmit={onSubmitFilter} inputSearch={searchInput} onResetFilter={onResetFilter} onChangeInputSearch={onChangeSearch} itemSearch={itemSearch} onSelect={onSelectFilter} isOpening={false} />
      <ChkyTablePagination
        isLoadData={isLoading}
        data={data}
        fields={TableTemplatePart.titleTable}
        cellOption={TableTemplatePart.valueType}
        changePage={handleChangePagePart}
        isSort={TableTemplatePart.isSort}
        rowsPerPage={rowsPerPage}
        handleSort={handleSortPart}
        totalPages={tablePartConfig.totalPages}
        totalRows={tablePartConfig.totalRows}
        sortBy={tablePartConfig.sortBy}
        order={tablePartConfig.orderDirection}
        isUsingMuiSort
        leftAlignHeaders={[0, 1, 2, 3, 4, 5]}
        leftAlignBody={[0, 1, 2, 3, 4, 5]}
      />
      {
        dialog.edit &&
        <EditForm
          isOpen={dialog.edit}
          onClose={() => {handleDialog('edit', false);}}
          currentData={currentData}
          refresh={fetchDataPart}
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

export default PartPanel;
