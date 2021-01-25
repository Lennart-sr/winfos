export default {
  methods: {
    sendAlert(msg) {
      const alert = document.createElement('small'),
      inputs = document.querySelectorAll('input');
      alert.classList.add("alert");
      alert.innerText = msg;

      inputs[inputs.length-1].after(alert);
      setTimeout(() => alert.remove(), 10000);
    }
  }
}