<script setup lang="ts">
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import {AgGridVue} from "ag-grid-vue3";
import "ag-grid-enterprise";
import {type GridApi, LicenseManager, type ValueFormatterParams, type ValueGetterParams} from "ag-grid-enterprise";
import {ref} from "vue";
import {type RowData, RowInstance} from "@/types";
import axios from "axios";

LicenseManager.setLicenseKey("DownloadDevTools_COM_NDEwMjM0NTgwMDAwMA==59158b5225400879a12a96634544f5b6");


const rowData = ref<RowInstance>()
const gridApi = ref<GridApi>()

const colDefs = [
  {
    headerName: 'Advertiser Name',
    field: 'advertiserName',
    rowGroup: true,
    hide: true,
    rowGroupIndex: 0,

  },
  {
    headerName: 'Ext Service Name',
    field: 'extServiceName',
    rowGroup: true,
    hide: true,
    rowGroupIndex: 1,
  },
  {
    headerName: 'Channel Name',
    field: 'channelName',
    rowGroup: true,
    hide: true,
    rowGroupIndex: 2,
  },
  {
    headerName: 'Time',
    field: 'parseTime',
    valueGetter: (params: ValueGetterParams) => params.data?.parseTime,
    valueFormatter: (params: ValueFormatterParams) => {
      if (params.value) {
        return params.value.toLocaleDateString('en-GB')
      }
    },
  },
  {
    headerName: 'Creative Width',
    field: 'creativeWidth',
  },
  {
    headerName: 'Creative Height',
    field: 'creativeHeight',
  },
  {
    headerName: 'Search Tags',
    field: 'searchTags',
  },
  {
    headerName: 'Impressions',
    field: 'impressions',
  },
  {
    headerName: 'Clicks',
    field: 'clicks',
  },
  {
    headerName: 'Max Bid Cpm',
    field: 'maxBidCpm',
  },
]

const defaultColDef = {
  flex: 1,
  cellStyle: {'text-align': 'center'},
  enableRowGroup: true,
  enableValue: true,
  filter: 'agNumberColumnFilter',
  autoHeaderHeight: true,
  wrapHeaderText: true,
  filterParams: {
    buttons: ['clear'],
  },
  lockRowGroup: true,
  suppressHeaderFilterButton: true,
}

const autoGroupColumnDef = {
  headerName: 'Group',
  minWidth: 360,
  pinned: true,
  cellClass: ['flex', 'items-center'],
  cellRendererParams: {
    suppressDoubleClickExpand: true,
    suppressCount: true,
  },
}

async function onGridReady(params: any) {
  gridApi.value = params.api

  await fetchData()
}

async function fetchData() {
  const res = await axios.get('http://localhost:5173/data.json')
  if (res.status === 200) {
    rowData.value = res.data.rowData.map((row: RowData) => new RowInstance(row))
  }
}
</script>

<template>
  <div class="h-screen w-screen px-10 pt-5">
    <p class="font-bold text-4xl text-center">Data Table</p>
    <div class="h-[80vh] w-full mt-5">
      <ag-grid-vue
          style="width: 100%; height: 100%;"
          class="ag-theme-quartz"
          :column-defs="colDefs"
          :default-col-def="defaultColDef"
          :auto-group-column-def="autoGroupColumnDef"
          :row-data="rowData"
          :row-group-panel-show="'always'"
          :animate-rows="true"
          :suppress-agg-func-in-header="true"
          :enable-range-selection="true"
          @grid-ready="onGridReady"
      />
    </div>
  </div>
</template>

<style scoped>
</style>
