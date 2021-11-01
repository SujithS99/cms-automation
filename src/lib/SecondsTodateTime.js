export default function SecondsToDateTime(seconds, type) {

  let result;

  if(type==='datetime')
  {
    var utcDate = new Date(null);
    utcDate.setTime(seconds * 1000);
    result =  utcDate.toLocaleString();

    return result;
  } 

  if(type==='hhmm')
  {
    result = new Date(seconds * 1000).toISOString().substr(11, 5)
    return result;
  }

  if(type==='timelocal')
  {
    result = new Date(new Date(seconds*1000).toString().split('GMT')[0]+' UTC').toISOString().split('.')[0];
    return result;

  }

  
}

