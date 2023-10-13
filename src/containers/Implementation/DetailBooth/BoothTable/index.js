import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import DynamicTablePagination from '../../../../components/DynamicTablePagination';

const BoothTable = props => {
    const { tabTableTab, isLoading } = props

    const { t } = useTranslation()

    const actionEdit = () => {
        console.log('Edit');
    }

    const actionDelete = () => {
        console.log('Delete');
    }

    const dataAction = [
        {
            name: 'Edit',
            type: 'edit',
            handler: actionEdit,
        },
        {
            name: 'Delete',
            type: 'delete',
            handler: actionDelete,
        },
    ]

    const dataDummyPengadaan = [
        {
            orderLocation: 'Lokasi Order',
            orderDate: '10/10/20',
            type: 'Standar',
            dimention: '4 x 2 x 3',
            vendorName: 'PT. Maju Sentosa',
            boothLocation: 'Lokasi Booth',
            serialNumber: '200108287612',
            sendingCost: 'Rp 300.000',
            installationCost: 'Rp 300.000',
            installationDate: '10/10/20',
            action: dataAction
        }
    ]

    const dataDummyDestroy = [
        {
            orderLocation: 'Lokasi Order',
            orderDate: '10/10/20',
            type: 'Standar',
            dimention: '4 x 2 x 3',
            vendorName: 'PT. Maju Sentosa',
            boothLocation: 'Lokasi Booth',
            serialNumber: '200108287612',
            action: dataAction
        }
    ]

    const titleTablePengadaan = [
        t('implementation.detail.booth.orderLocation'),
        t('implementation.detail.booth.orderDate'),
        t('implementation.detail.booth.type'),
        t('implementation.detail.booth.dimention'),
        t('implementation.detail.booth.vendorName'),
        t('implementation.detail.booth.boothLocation'),
        t('implementation.detail.booth.serialNumber'),
        t('implementation.detail.booth.sendingCost'),
        t('implementation.detail.booth.installationCost'),
        t('implementation.detail.booth.installationDate'),
        ''
    ]

    const titleTableDestroy = [
        t('implementation.detail.booth.orderLocation'),
        t('implementation.detail.booth.orderDate'),
        t('implementation.detail.booth.type'),
        t('implementation.detail.booth.dimention'),
        t('implementation.detail.booth.vendorName'),
        t('implementation.detail.booth.boothLocation'),
        t('implementation.detail.booth.serialNumber'),
        ''
    ]

    const valueTypePengadaan = [
        'string',
        'string',
        'string',
        'string',
        'string',
        'string',
        'string',
        'string',
        'string',
        'string',
        'menuNew'
    ]

    const valueTypeDestroy = [
        'string',
        'string',
        'string',
        'string',
        'string',
        'string',
        'string',
        'menuNew'
    ]

    return (
        <div>
            {tabTableTab === 0 ?
                <DynamicTablePagination
                    data={dataDummyPengadaan}
                    fields={titleTablePengadaan}
                    cellOption={valueTypePengadaan}
                    rowsPerPage={10}
                    totalRows={10}
                    isLoading={isLoading}
                />
                :
                <DynamicTablePagination
                    data={dataDummyDestroy}
                    fields={titleTableDestroy}
                    cellOption={valueTypeDestroy}
                    rowsPerPage={10}
                    totalRows={10}
                    isLoading={isLoading}
                />}
        </div>
    );
};

BoothTable.propTypes = {
    tabTableTab: PropTypes.number,
    isLoading: PropTypes.bool
}

BoothTable.defaultProps = {
    isLoading: false
}

export default BoothTable;