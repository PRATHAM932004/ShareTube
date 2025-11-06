//Toast Visibility Time
export const DEFAULT_VISIBILITY_TIME = 4000;
export const LONG_VISIBILITY_TIME = 15000;

export const STATUS = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORISE: 401,
};

export const TF_VALUE = {
  FALSE: '0',
  TRUE: '1',
  FALSE_INT: 0,
  TRUE_INT: 1,
};

export const TabWithoutCurrentMachineCard = [
  { key: 'mCard', title: 'M-Cards' },
  { key: 'stoppage', title: 'Stoppage' },
];

export const TabWithCurrentMachineCard = [
  { key: 'mCard', title: 'M-Cards' },
  { key: 'operation', title: 'Operation' },
  { key: 'stoppage', title: 'Stoppage' },
];
