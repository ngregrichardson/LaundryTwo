export default (path, params={}) => {
    return new Promise(resolve => {
        fetch(`https://laundryview.com/api/${path}?${Object.keys(params).map(key => key + '=' + params[key]).join('&')}`).then(res => resolve(res.json()));
    });
};
