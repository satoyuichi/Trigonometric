mathbox = mathBox({
  plugins: ['core', 'controls', 'cursor', 'stats'],
  controls: {
    klass: THREE.OrbitControls
  },
});
three = mathbox.three;

//three.camera.position.set(2.3, 1, 2);
three.camera.position.set(0, 0, 5);
three.renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);

view = mathbox.cartesian({
  range: [[-3, 7], [-3, 3], [-1, 1]],
  scale: [5, 3, 1],
});

view.axis({
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

view.interval({
  width: 128,
  expr: function (emit, x, i, time) {
    emit(0, 0);
    emit(0, Math.sin(time));
    emit(0, 0);
    emit(Math.cos(time), 0);
    emit(0, 0);
    emit(Math.cos(time), Math.sin(time));
  },
  items: 3,
  channels: 2,
})
  .vector({
    color: 0xFF0000,
    width: 10,
    stroke: "solid",
    end: true
  });

view.array({
  width: 32,
  expr: function (emit, i, time, delta) {
    emit(Math.cos(i), Math.sin(i));
  },
  items: 1,
  channels: 2,
})
  .point({
    color: 0xFF0000,
    size: 10,
  });

view.interval({
  width: 128,
  expr: function (emit, x, i, time) {
    emit(0, Math.sin(time));
  },
  items: 2,
  channels: 2,
})
  .point({
    color: 0x0000FF,
    size: 40,
  });

view.interval({
  width: 128,
  expr: function (emit, x, i, time) {
    emit(Math.cos(time), 0);
  },
  items: 1,
  channels: 2,
})
  .point({
    color: 0x00FF00,
    size: 40,
  });

view.interval({
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
  });

view.interval({
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
  });

