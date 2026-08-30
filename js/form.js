const contactForm = document.querySelector("[data-contact-form]");
const successMessage = document.querySelector("[data-form-success]");
const errorElements = {
  name: document.querySelector('[data-error-for="name"]'),
  email: document.querySelector('[data-error-for="email"]'),
  message: document.querySelector('[data-error-for="message"]'),
};

const formState = {
  values: {
    name: "",
    email: "",
    message: "",
  },
  errors: {},
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validateForm = () => {
  const errors = {};
  const { name, email, message } = formState.values;

  if (!name.trim()) {
    errors.name = "이름을 입력해주세요.";
  }

  if (!email.trim()) {
    errors.email = "이메일을 입력해주세요.";
  } else if (!isValidEmail(email)) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }

  if (!message.trim()) {
    errors.message = "메시지를 입력해주세요.";
  }

  formState.errors = errors;
  return Object.keys(errors).length === 0;
};

const renderForm = () => {
  Object.entries(errorElements).forEach(([field, element]) => {
    element.textContent = formState.errors[field] || "";
  });
};

contactForm.addEventListener("input", (event) => {
  const { name, value } = event.target;

  if (!Object.hasOwn(formState.values, name)) {
    return;
  }

  formState.values[name] = value;
  validateForm();
  renderForm();
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  formState.values = Object.fromEntries(formData.entries());

  if (!validateForm()) {
    successMessage.textContent = "";
    renderForm();
    return;
  }

  successMessage.textContent = "메시지가 성공적으로 준비되었습니다.";
  contactForm.reset();
  formState.values = { name: "", email: "", message: "" };
  formState.errors = {};
  renderForm();
});
