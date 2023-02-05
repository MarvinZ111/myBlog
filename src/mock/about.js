import Mock from 'mockjs';

Mock.mock('/api/about', 'get', {
    code: 0,
    msg: '',
    data: 'https://marvinz111.github.io/resume/',
});
