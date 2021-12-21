const delay = require('mocker-api/lib/delay');
const Mock = require('mockjs');

const mockProxy = {
  [`GET /mock/projects/list`]: (req, res) => {
    return res.json(
      Mock.mock({
        code: 0,
        'data|15': [
          {
            'id|+1': 1,
            name: '@string("upper", 5)',
            'status|1-3': 3,
            time: '@datetime',
          },
        ],
      }),
    );
  },
};
module.exports = delay(mockProxy, 1000);
