export const formateTime = (time) => {
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor((time - hours * 3600) / 60);
    var seconds = Math.floor(time  - hours * 3600 - minutes * 60);
    return (
      ( hours > 0 ? (hours + ':') : '' ) +
      ( minutes < 10 ? '0' + minutes : minutes ) + ':' +
      ( seconds < 10 ? '0' + seconds : seconds )
    );
  }