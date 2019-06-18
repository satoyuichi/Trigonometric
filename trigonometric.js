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
      present.set('index', present.get('index') - 1);
      break;
    case 39:
    case 40:
      present.set('index', present.get('index') + 1);
      break;
    }
    //console.log(present.get('index'));
  }
}

view = mathbox.cartesian({
  range: [[-3, 7], [-3, 3], [-1, 1]],
  scale: [5, 3, 1],
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
    divideX: 5,
    divideY: 3,
  });

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
      emit(Math.cos(time), Math.sin(time));
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
      emit(Math.cos(time), 0);
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
      emit(0, Math.sin(time));
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
      emit(0, Math.sin(time));
    },
    items: 1,
    channels: 2,
  })
  .point({
    color: 0x0000FF,
    size: 40,
  })
  .interval({
    width: 1,
    expr: function (emit, x, i, time) {
      emit(Math.cos(time), 0);
    },
    items: 1,
    channels: 2,
  })
  .point({
    color: 0x00FF00,
    size: 40,
  })
  .end()
  .slide().reveal()
  .interval({
    width: 128,
    expr: function (emit, x, i, time) {
      var d = Math.sin(x + time);
      emit(x, d);
    },
    items: 1,
    channels: 2,
  })
  .line({
    color: 0x3090FF,
    width: 10,
  }).interval({
    width: 128,
    expr: function (emit, x, i, time) {
      var d = Math.cos(x + time);
      emit(d, x);
    },
    items: 1,
    channels: 2,
  })
  .line({
    color: 0x30FF90,
    width: 10,
  }).end().end();
