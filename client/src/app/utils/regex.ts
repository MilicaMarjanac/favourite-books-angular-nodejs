const phoneNumber = new RegExp(/^(\+)?([ 0-9]){1,}$/i);

const numbers = new RegExp(/^[0-9]+$/i);

const email = new RegExp(
  /^[a-zA-Z+-_]+@(?![^.]\.[a-zA-Z]{1,}$)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/
);

export { phoneNumber, numbers, email };
