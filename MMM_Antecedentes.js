Module.register("MMM_Antecedentes", {
  defaults: {
    serverURL: "http://localhost:5000"
  },

  start: function() {
    this.pregunta = "Cargando pregunta...";
    this.getPregunta();
  },

  getStyles: function() {
    return ["MMM_Antecedentes.css"];
  },

  // Obtener pregunta desde Python
  getPregunta: function() {
    fetch(this.config.serverURL + "/pregunta")
      .then(response => response.json())
      .then(data => {
        this.pregunta = data.pregunta;
        this.updateDom();
      })
      .catch(err => {
        this.pregunta = "Error al cargar pregunta";
        this.updateDom();
        console.error(err);
      });
  },

  // Enviar respuesta a Python
  enviarRespuesta: function(respuesta) {
    fetch(this.config.serverURL + "/respuesta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ respuesta: respuesta })
    })
    .then(() => console.log("Respuesta enviada:", respuesta))
    .catch(err => console.error(err));
  },

  getDom: function() {
    var wrapper = document.createElement("div");
    wrapper.className = "antecedentes-wrapper";

    var preguntaDiv = document.createElement("div");
    preguntaDiv.className = "pregunta";
    preguntaDiv.innerHTML = this.pregunta;
    wrapper.appendChild(preguntaDiv);

    var botones = document.createElement("div");
    botones.className = "botones";

    var btnSi = document.createElement("button");
    btnSi.innerHTML = "Sí";
    btnSi.onclick = () => this.enviarRespuesta("Sí");
    botones.appendChild(btnSi);

    var btnNo = document.createElement("button");
    btnNo.innerHTML = "No";
    btnNo.onclick = () => this.enviarRespuesta("No");
    botones.appendChild(btnNo);

    wrapper.appendChild(botones);

    return wrapper;
  }
});

