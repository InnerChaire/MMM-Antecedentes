Module.register("MMM_Antecedentes", {
  defaults: {
    serverURL: "http://localhost:5000"
  },

  start: function() {
    this.pregunta = "Cargando pregunta...";
    this.inputTexto = "";
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
  enviarRespuesta: function() {
    if (this.inputTexto.trim() === "") {
      console.log("Respuesta vacía");
      return;
    }

    fetch(this.config.serverURL + "/respuesta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ respuesta: this.inputTexto })
    })
    .then(() => {
      console.log("Respuesta enviada:", this.inputTexto);
      this.inputTexto = "";
      this.updateDom();
    })
    .catch(err => console.error(err));
  },

  agregarLetra: function(letra) {
    this.inputTexto += letra;
    this.updateDom();
  },

  borrarLetra: function() {
    this.inputTexto = this.inputTexto.slice(0, -1);
    this.updateDom();
  },

  getDom: function() {
    var wrapper = document.createElement("div");
    wrapper.className = "antecedentes-wrapper";

    // Pregunta
    var preguntaDiv = document.createElement("div");
    preguntaDiv.className = "pregunta";
    preguntaDiv.innerHTML = this.pregunta;
    wrapper.appendChild(preguntaDiv);

    // INPUT VISUAL
    var inputDiv = document.createElement("div");
    inputDiv.className = "input-visual";
    inputDiv.innerHTML = this.inputTexto || "Escribe tu respuesta...";
    wrapper.appendChild(inputDiv);

    // TECLADO
    const teclado = [
      ["Q","W","E","R","T","Y","U","I","O","P"],
      ["A","S","D","F","G","H","J","K","L"],
      ["Z","X","C","V","B","N","M"],
      ["0","1","2","3","4","5","6","7","8","9"]
    ];

    var tecladoDiv = document.createElement("div");
    tecladoDiv.className = "teclado";

    teclado.forEach(fila => {
      var filaDiv = document.createElement("div");
      filaDiv.className = "fila-teclado";

      fila.forEach(letra => {
        var btn = document.createElement("button");
        btn.innerHTML = letra;
        btn.onclick = () => this.agregarLetra(letra);
        filaDiv.appendChild(btn);
      });

      tecladoDiv.appendChild(filaDiv);
    });

    // BOTONES ESPECIALES
    var filaEspecial = document.createElement("div");
    filaEspecial.className = "fila-teclado";

    var espacioBtn = document.createElement("button");
    espacioBtn.innerHTML = "Espacio";
    espacioBtn.onclick = () => this.agregarLetra(" ");
    filaEspecial.appendChild(espacioBtn);

    var borrarBtn = document.createElement("button");
    borrarBtn.innerHTML = "Borrar";
    borrarBtn.onclick = () => this.borrarLetra();
    filaEspecial.appendChild(borrarBtn);

    var enviarBtn = document.createElement("button");
    enviarBtn.innerHTML = "Enviar";
    enviarBtn.onclick = () => this.enviarRespuesta();
    filaEspecial.appendChild(enviarBtn);

    tecladoDiv.appendChild(filaEspecial);

    wrapper.appendChild(tecladoDiv);

    return wrapper;
  }
});
