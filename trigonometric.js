MathBox.DOM.Types.latex = MathBox.DOM.createClass({
  render: function (el) {
    this.props.innerHTML = katex.renderToString(this.children);
    return el('span', this.props);
  }
});

function toTimeWithPlay(time) {
  return params.play ? time : 0;
}

mathbox = mathBox({
  plugins: ['core', 'controls', 'cursor', 'stats'],
  controls: {
    klass: THREE.OrbitControls
  },
});
three = mathbox.three;

three.camera.position.set(0, 0, 6);
three.renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);

if (window == top) {
  window.onkeydown = function (e) {
    switch (e.keyCode) {
    case 37:
    case 38:
      prevSlide();
      break;
    case 39:
    case 40:
      nextSlide();
      break;
    }
    //console.log(present.get('index'));
  }
}

function prevSlide () {
  present.set('index', present.get('index') - 1);
}

function nextSlide () {
  present.set('index', present.get('index') + 1);
}

view = mathbox.cartesian({
  range: [[-7, 7], [-3, 3], [-1, 1]],
  scale: [7, 3, 1],
});

present = view.present({
  index: 1
})

present.axis({
  axis: 1,
  width: 10,
  start: true,
})
  .axis({
    axis: 2,
    width: 10,
    start: true,
  })
  .grid({
    width: 2,  
    divideX: 7,
    divideY: 3,
  });

present.interval({
  expr: function (emit, i, time, delta) {
    emit(0, 0);
  },
  items: 1,
  channels: 2,
})
  .html({
    width: 8,
    height: 3,
    depth:  2,
    expr: function (emit, el, i, j, k, l, time) {
      amplitudeContent = (params.amplitude > 1) ? params.amplitude : "";
      angularContent = (params.angular > 1) ? params.angular : "";

      // Emit latex element
      emit(el('latex', null, amplitudeContent + '\\sin ({ ' + angularContent + '\\theta})'));
    },
  })
  .dom({
    snap: false,
    offset: [0, 233],
    depth: .5,
    size: 48,
    zoom: 1,
    outline: 2,
  })

present.slide().reveal({
  duration: .5
}).array({
  width: 4,
  expr: function (emit, i, time, delta) {
    emit(0, 0);
    emit(1, 0);

    emit(1, 0);
    emit(1, 1);

    emit(1, 1);
    emit(0, 0);
  },
  items: 3,
  channels: 2,
}).transform({scale: [1.0, 1.0, 1.0]}).step({
  script: [
    [{scale: [1.0, 1.0, 1.0]}],
    [{scale: [2.0, 1.0, 1.0]}],
    [{scale: [1.0, 2.0, 1.0]}],
    [{scale: [1.0, 0.0, 1.0]}],
  ]
}).line({
  color: 0xFF0000,
  width: 20,
  stroke: "solid",
}).end().end()
  .slide()
  .end()
  .slide()
  .end()
  .slide().reveal()
  .end();

present.slide().reveal()
  .interval({
    width: 2,
    expr: function (emit, x, i, time) {
      emit(0, 0);
      emit(Math.cos(toTimeWithPlay(time)), params.amplitude * Math.sin(params.angular * (toTimeWithPlay(time))));
    },
    items: 1,
    channels: 2,
  })
  .line({
    color: 0xFF0000,
    width: 20,
    stroke: "solid",
    end: true
  })
  .interval({
    width: 2,
    expr: function (emit, x, i, time) {
      emit(0, 0);
      emit(Math.cos(toTimeWithPlay(time)), 0);
    },
    items: 1,
    channels: 2,
  })
  .line({
    color: 0xFF0000,
    width: 15,
    stroke: "solid",
  })
  .interval({
    width: 2,
    expr: function (emit, x, i, time) {
      emit(0, 0);
      emit(0, params.amplitude * Math.sin(params.angular * (toTimeWithPlay(time))));
    },
    items: 1,
    channels: 2,
  })
  .line({
    color: 0xFF0000,
    width: 15,
    stroke: "solid",
  })
  .interval({
    width: 1,
    expr: function (emit, x, i, time) {
      emit(0, params.amplitude * Math.sin(params.angular * (toTimeWithPlay(time))));
    },
    items: 1,
    channels: 2,
  })
  .point({
    color: 0x0000FF,
    size: 40,
  })
  .html({
    width: 8,
    height: 3,
    depth:  2,
    expr: function (emit, el, i, j, k, l, time) {
      // Emit latex element
      emit(el('latex', null, '(0, \\sin {\\theta})'));
    },
  })
  .dom({
    snap: false,
    offset: [0, -48],
    depth: .5,
    size: 32,
    zoom: 1,
    outline: 2,
  })
  .interval({
    width: 1,
    expr: function (emit, x, i, time) {
      emit(Math.cos(toTimeWithPlay(time)), 0);
    },
    items: 1,
    channels: 2,
  })
  .point({
    color: 0x00EE00,
    size: 40,
  })
  .html({
    width: 8,
    height: 3,
    depth:  2,
    expr: function (emit, el, i, j, k, l, time) {
      // Emit latex element
      emit(el('latex', null, '(\\cos {\\theta}, 0)'));
    },
  })
  .dom({
    snap: false,
    offset: [0, -34],
    depth: .5,
    size: 32,
    zoom: 1,
    outline: 2,
  })
  .end()
  .slide().reveal()
  .interval({
    width: 256,
    expr: function (emit, x, i, time) {
      var d = params.amplitude * Math.sin(params.angular * (x + (toTimeWithPlay(time))));
      emit(x, d);
    },
    items: 2,
    channels: 2,
  })
  .line({
    color: 0x3090FF,
    width: 10,
  })
  .transform().step({
    duration: 1,
    script: [
      {rotation: [0, 0, 0]},
      {rotation: [0, 0, π / 2.0]},
    ]
  })
  .interval({
    width: 128,
    expr: function (emit, x, i, time) {
      var d = Math.cos(x - toTimeWithPlay(time));
      emit(d, x);
    },
    items: 1,
    channels: 2,
  })
  .line({
    color: 0x30EE90,
    width: 10,
  }).end()
  .slide().reveal()
  .interval({
    width: 32,
    expr: function (emit, x, i, time) {
      h = 0.15;
      t1 = Math.sin(x - h + toTimeWithPlay(time));
      t2 = Math.sin(x + h + toTimeWithPlay(time));

      tilt = (t2 - t1) / 2.0 * h;
      
      emit(x - h, t1);
      emit(x + h, t2);
    },
    items: 2,
    channels: 2,
  }).vector ({
    color: 0xff8866,
    width: 16,
    end: true,
  })
  .step({
    script: [
      {props: {opacity: 0.0}},
      {props: {opacity: 1.0}},
    ]
  })
  .slide().reveal()
  .interval({
    width: 32,
    expr: function (emit, x, i, time) {
      h = 0.08;
      t1 = Math.sin(x - h + toTimeWithPlay(time));
      t2 = Math.sin(x + h + toTimeWithPlay(time));
      emit(x, Math.sin(x + toTimeWithPlay(time)));
      emit(x, (t2 - t1) / (2.0 * h));
    },
    items: 2,
    channels: 2,
  }).vector ({
    color: 0xffff00,
    width: 20,
    end: true,
  })
  .step({
    script: [
      {props: {opacity: 0.0}},
      {props: {opacity: 1.0}},
    ]
  }).end()
  .slide();
