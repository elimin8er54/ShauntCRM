export default {
  //This is usually for images. So we dont have to switch between http and https when in dev/prod. 
  //We just get it from the response instead.
  getHttpProto:  () => {
    let HTTP_TYPE = "https://";
    if (location.protocol !== 'https:') {
      HTTP_TYPE = "http://";
    } else {
      HTTP_TYPE = "https://";
    }

    return HTTP_TYPE;
  },

  formatPhoneNumber: function (phoneNumberString: string) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = (match[1] ? '+1 ' : '');
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
  },

  getDay: function (date: Date) {
    if (!Number.isNaN(date.getTime()))
      return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
  },

  loadImage: function (path:string)  {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => { resolve('Success') }
        img.onerror = () => { reject() }
        img.src = path;
    })
},

 loadImages: function (paths:Promise<void>[])  {
    return Promise.all(paths.map(this.loadImage));
}

}