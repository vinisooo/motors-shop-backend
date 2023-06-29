function getTimeSince(timestamp: Date | string): string {
    const currentTime = new Date();
    const commentTime = new Date(timestamp instanceof Date ? timestamp : Date.parse(timestamp));
    let timeDiff = Math.floor((currentTime.getTime() - commentTime.getTime()) / 1000 / 60);
  
    timeDiff -= 60
    const minute = 1;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 365 * day;

    if (timeDiff >= year) {
      const years = Math.floor(timeDiff / year);
      return `há ${years} ${years === 1 ? "ano" : "anos"}`;
    } else if (timeDiff >= month) {
      const months = Math.floor(timeDiff / month);
      return `há ${months} ${months === 1 ? "mês" : "meses"}`;
    } else if (timeDiff >= day) {
      const days = Math.floor(timeDiff / day);
      return `há ${days} ${days === 1 ? "dia" : "dias"}`;
    } else if (timeDiff >= hour) {
      const hours = Math.floor(timeDiff / hour);
      return `há ${hours} ${hours === 1 ? "hora" : "horas"}`;
    } else if (timeDiff >= minute) {
      return `há ${timeDiff} ${timeDiff === 1 ? "minuto" : "minutos"}`;
    } else {
      return "agora mesmo";
    }
  }
  
  export { getTimeSince };
  