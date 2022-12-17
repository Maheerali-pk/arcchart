const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const resizeCanvas = () => {
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   drawMyArc();
};

const degreeToRadian = (degree) => {
   return ((degree * Math.PI) / 180) * -1;
};

const wait = (time) => new Promise((res) => setTimeout(res, time));

const drawMyArc = () => {
   drawArc({
      startAngle: degreeToRadian(150),
      endAngle: degreeToRadian(30),
      x: 300,
      y: 300,
      radius: 200,
      thickness: 25,
      fillStartAngle: degreeToRadian(50),
      fillEndAngle: degreeToRadian(150),
      clockwise: false,
   });
};
window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvas);
window.addEventListener("load", async () => {
   drawMyArc();
   // for (let i = 150; i >= 30; i--) {
   //    await wait(10);
   //    drawArc({
   //       startAngle: degreeToRadian(150),
   //       endAngle: degreeToRadian(30),
   //       x: 300,
   //       y: 300,
   //       radius: 200,
   //       thickness: 25,
   //       fillStartAngle: degreeToRadian(i),
   //       fillEndAngle: degreeToRadian(150),
   //       clockwise: false,
   //    });
   // }
   // for (let i = 30; i <= 150; i++) {
   //    await wait(10);
   //    drawArc({
   //       startAngle: degreeToRadian(150),
   //       endAngle: degreeToRadian(30),
   //       x: 300,
   //       y: 300,
   //       radius: 200,
   //       thickness: 25,
   //       fillStartAngle: degreeToRadian(i),
   //       fillEndAngle: degreeToRadian(30),
   //       clockwise: true,
   //    });
   // }
});
const drawArc = ({ startAngle, endAngle, thickness, x, y, radius, fillStartAngle, fillEndAngle, clockwise = true }) => {
   //Outer arc
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   const ratio = window.innerWidth / 1920;
   ctx.scale(ratio, ratio);
   let angleChange = Math.abs(startAngle - endAngle) * 0.05 * 0;
   ctx.beginPath();
   ctx.arc(x, y, radius, startAngle, endAngle);
   ctx.arc(x, y + thickness, radius - thickness, endAngle - angleChange, startAngle + angleChange, true);
   ctx.closePath();
   ctx.stroke();
   ctx.beginPath();
   ctx.arc(x, y, radius, fillStartAngle, fillEndAngle, clockwise ? false : true);
   ctx.fillStyle = "rgba(255,0,0,255)";
   ctx.arc(
      x,
      y + thickness,
      radius - thickness,
      fillEndAngle - angleChange,
      fillStartAngle + angleChange,
      clockwise ? true : false
   );
   ctx.closePath();
   ctx.fillStyle = "rgba(255,0,0,255)";
   ctx.fill();
   // }

   //Starting point
   if (clockwise === false) {
      const angle = Math.abs(-fillStartAngle);
      ctx.strokeStyle = "rgba(0,255,0,255)";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(angle) * radius, y - Math.sin(angle) * radius);
      ctx.lineTo(
         x + Math.cos(angle + angleChange) * (radius - thickness),
         y + thickness - Math.sin(angle + angleChange) * (radius - thickness)
      );
   } else {
      const angle = Math.abs(-fillStartAngle);
      ctx.strokeStyle = "rgba(0,255,0,255)";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(angle) * radius, y - Math.sin(angle) * radius);
      ctx.lineTo(
         x + Math.cos(angle + angleChange) * (radius - thickness),
         y + thickness - Math.sin(angle + angleChange) * (radius - thickness)
      );
   }

   ctx.stroke();
};

setInterval(() => {});
