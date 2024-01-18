import got from 'got';

export interface ShinhanCurrencyRateResponse {
  dataHeader: ShinhanCurrencyRateResponseDataHeader;
  dataBody: ShinhanCurrencyRateResponseDataBody;
}

export interface ShinhanCurrencyRateResponseDataBody {
  ricInptRootInfo: ShinhanCurrencyRateResponseDataBodyRicInptRootInfo;
  고시일자: string;
  고시일자_display: string;
  고시시간: string;
  고시시간_display: string;
  고시회차: number;
  반복횟수: number;
  R_RIBF3730_1: ShinhanCurrencyRateResponseDataBodyRRIBF37301[];
  반복횟수1: number;
  R_RIBF3730_2: ShinhanCurrencyRateResponseDataBodyRRIBF37302[];
}

export interface ShinhanCurrencyRateResponseDataBodyRRIBF37302 {
  여행자수표제목: string;
  여행자통화1: string;
  여행자수표매입1: number;
  여행자수표매입1_display: string;
  여행자수표매도1: number;
  여행자수표매도1_display: string;
  여행자통화2: string;
  여행자수표매입2: number;
  여행자수표매입2_display: string;
  여행자수표매도2: number;
  여행자수표매도2_display: string;
  CROSS제목: string;
  CROSS통화: string;
  CROSSRATE: number;
  CROSSRATE_display: string;
}

export interface ShinhanCurrencyRateResponseDataBodyRRIBF37301 {
  통화CODE: string;
  통화CODE_display: string;
  전신환매입환율: number;
  전신환매입환율_display: string;
  전신환매도환율: number;
  전신환매도환율_display: string;
  지폐매입환율: number;
  지폐매입환율_display: string;
  지폐매도환율: number;
  지폐매도환율_display: string;
  TC매입환율: number;
  TC매입환율_display: string;
  TC매도환율: number;
  TC매도환율_display: string;
  매매기준환율: number;
  매매기준환율_display: string;
  대미환산환율: number;
  대미환산환율_display: string;
}

export interface ShinhanCurrencyRateResponseDataBodyRicInptRootInfo {
  serviceType: string;
  serviceCode: string;
  menuCode: string;
  nextServiceCode: string;
  pkcs7Data: string;
  signCode: string;
  signTempCode: string;
  signData: string;
  useSign: string;
  useCert: string;
  permitMultiTransaction: string;
  keepTransactionSession: string;
  skipErrorMsg: string;
  mode: string;
  language: string;
  exe2e: string;
  hideProcess: string;
  clearTarget: string;
  callBack: string;
  exceptionCallback: string;
  requestMessage: string;
  responseMessage: string;
  comTranDateTime: string;
  serviceOption: string;
  pcLog: string;
  removeIndex: string;
  redirectUrl: string;
  preInqKey: string;
  userCallback: string;
  certtype: string;
  resultStatus: string;
  skip: string;
  errorCode: string;
  errorMsg: string;
  errorDetailMsg1: string;
  fromMulti: string;
  isRule: string;
  webUri: string;
  gubun: string;
  tmpField2: string;
  tmpField3: string;
  tmpField4: string;
  tmpField5: string;
  _multi_transfer_: string;
  _multi_transfer_count_: number;
  _multi_transfer_amt_: number;
  msgID: string;
  FROM_MULTI_IDX: string;
  SESSION_SECCARD: string;
}

export interface ShinhanCurrencyRateResponseDataHeader {
  trxCd: string;
  globId: string;
  reqMsgIlsi: string;
  outMsgIlsi: string;
  language: string;
  subChannel: string;
  result: string;
  resultCode: string;
  resultMsg?: any;
  resultDetail?: any;
  channelGbn: string;
  submitGbn: string;
  programId: string;
  webProcGbn: string;
  locale: string;
  encG: number;
  secChal1: string;
  secChal2: string;
  uuid: string;
}


export interface VisaCurrencyRateResponse {
  originalValues: VisaCurrencyRateResponseOriginalValues;
  conversionAmountValue: string;
  conversionBankFee: string;
  conversionInputDate: string;
  conversionFromCurrency: string;
  conversionToCurrency: string;
  fromCurrencyName: string;
  toCurrencyName: string;
  convertedAmount: string;
  benchMarkAmount: string;
  fxRateWithAdditionalFee: string;
  reverseAmount: string;
  disclaimerDate: string;
  status: string;
}

export interface VisaCurrencyRateResponseOriginalValues {
  fromCurrency: string;
  fromCurrencyName: string;
  toCurrency: string;
  toCurrencyName: string;
  asOfDate: number;
  fromAmount: string;
  toAmountWithVisaRate: string;
  toAmountWithAdditionalFee: string;
  fxRateVisa: string;
  fxRateWithAdditionalFee: string;
  lastUpdatedVisaRate: number;
  benchmarks: VisaCurrencyRateResponseOriginalValuesBenchmark[];
}

export interface VisaCurrencyRateResponseOriginalValuesBenchmark {
  benchmarkSystem: string;
  benchmarkBaseCurrency: string;
  benchmarkBaseCurrencyName: string;
  toAmountWithBenchmarkRate: string;
  markupWithoutAdditionalFee: string;
  markupWithAdditionalFee: string;
  benchmarkFxRate: string;
  lastUpdatedBenchmarkRate: number;
}

const getShinhanCurrencyRates = async (date: string, index = 1) => {
  const response = await got.post<ShinhanCurrencyRateResponse>('https://bank.shinhan.com/serviceEndpoint/httpDigital', {
    responseType: 'json',
    headers: {
      referer: 'https://bank.shinhan.com/rib/easy/index.jsp',
      accept: 'application/json',
      'accept-language': 'en-US,en;q=0.9,ko-KR;q=0.8,ko;q=0.7',
      'content-type': 'application/json; charset="UTF-8"',
      'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      submissionid: 'sbm_F3730',
    },
    json: {
      dataBody: {
        ricInptRootInfo: {
          serviceType: 'GU',
          serviceCode: 'F3730',
          nextServiceCode: '',
          pkcs7Data: '',
          signCode: '',
          signData: '',
          useSign: '',
          useCert: '',
          permitMultiTransaction: '',
          keepTransactionSession: '',
          skipErrorMsg: '',
          mode: '',
          language: 'ko',
          exe2e: '',
          hideProcess: '',
          clearTarget: '',
          callBack: 'shbObj.fncF3730Callback',
          exceptionCallback: '',
          requestMessage: '',
          responseMessage: '',
          serviceOption: '',
          pcLog: '',
          preInqForMulti: '',
          makesum: '',
          removeIndex: '',
          redirectUrl: '',
          preInqKey: '',
          _multi_transfer_: '',
          _multi_transfer_count_: '',
          _multi_transfer_amt_: '',
          userCallback: '',
          menuCode: '',
          certtype: '',
          fromMulti: '',
          fromMultiIdx: '',
          isRule: 'N',
          webUri: '/rib/easy/index.jsp',
          gubun: '',
          tmpField2: '',
        },
        조회구분: '',
        조회일자: date,
        고시회차: index,
        조회일자_display: '',
      },
      dataHeader: { trxCd: 'RSHRC0213A01', language: 'ko', subChannel: '51', channelGbn: 'D0' },
    },
  });

  return response.body;
};

/**
 *
 * @param currencyCode
 * @param dateString must be in format MM/DD/YYYY
 * @returns
 */
const getVisaCurrencyRate = async (currencyCode: string, dateString: string) => {
  // https://www.visakorea.com/cmsapi/fx/rates?amount=1&fee=0&utcConvertedDate=01%2F01%2F2024&exchangedate=01%2F01%2F2024&fromCurr=USD&toCurr=JPY
  const response = await got.get<VisaCurrencyRateResponse>('https://www.visakorea.com/cmsapi/fx/rates', {
    headers: {
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      origin: 'https://www.visakorea.com',
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en',
    },
    searchParams: {
      amount: 1,
      fee: 0,
      utcConvertedDate: dateString,
      exchangedate: dateString,
      fromCurr: 'USD',
      toCurr: currencyCode,
    },
    responseType: 'json',
  });
  return response.body;
};
