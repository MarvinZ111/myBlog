import Mock from 'mockjs';
Mock.mock('/api/setting', 'get', {
    code: 0,
    msg: '',
    data: {
        name: 'marvin',
        github: 'https://github.com/MarvinZ111',
        mail: 'zwq2101413613@163.com',
        qq: '2101413613',
        weixin: 'marvin1_',
        icp: 'author: marvin',
        githubName: 'MarvinZ111',
        favicon: 'http://mdrs.yuanjin.tech/Fs4CDlC6mwe_WXLMIiXcmSJLHO4f',
        title: 'marvin的个人空间',
    },
});
