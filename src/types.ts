import {convertNumberToDate} from "@/utils";

export interface RowData {
  advertiserName: string //G1
  extServiceName: string //G2
  channelName: string //G3
  creativeWidth: number
  creativeHeight: number
  searchTags: string
  time: number
  impressions: number
  clicks: number
  maxBidCpm: number
}

export class RowInstance implements RowData {
  advertiserName: string
  channelName: string
  clicks: number
  creativeHeight: number
  creativeWidth: number
  extServiceName: string
  impressions: number
  maxBidCpm: number
  searchTags: string
  time: number

  parseTime: Date | undefined

  constructor(data: RowData) {
    this.advertiserName = data.advertiserName
    this.channelName = data.channelName
    this.clicks = data.clicks
    this.creativeHeight = data.creativeHeight
    this.creativeWidth = data.creativeWidth
    this.extServiceName = data.extServiceName
    this.impressions = data.impressions
    this.maxBidCpm = data.maxBidCpm
    this.searchTags = data.searchTags
    this.time = data.time

    this.parseTime = convertNumberToDate(data.time)
  }
}