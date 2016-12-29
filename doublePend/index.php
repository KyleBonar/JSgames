<?php include 'header.html'; ?>

<div id='contentHolder'>
	<h2>Double Pendulum</h2>
	<p>Double pendulum's are interesting in the fact that they exhibit <a href='https://en.wikipedia.org/wiki/Chaos_theory' target='_blank'>chaotic motion</a>, meaning they are very sensitive to intial conditions, as well as simply being visually mesmorizing. This application uses JavaScript canvas method, therefore all of the computing is done on the user's browser and not the server. This essentially lightens the load for the server and makes it possible to serve up more applications, like this, to more people. The physics formulas used are from this <a href='http://sophia.dtp.fmph.uniba.sk/~kovacik/doublePendulum.pdf' target='_blank'>pdf</a>.</p>
	<p> Adjust the sliders and click "Reset Pendulum" to apply settings. To release the pendulum, click "Go!". Have fun!</p>
	<hr />

	<div id='canvasHolder'>
	</div>
		<div id='controlHolder'>
	  Ball 1 mass: <input id='ball1_mass' type='range' min='1' max='20' step='1' value='10'><span id='ball1_mass_val'></span><br />
	  Ball 2 mass: <input id='ball2_mass' type='range' min='1' max='20' step='1' value='10'><span id='ball2_mass_val'></span><br />
	  String 1 length: <input id='string1_length' type='range' min='50' max='150' step='10' value='120'><span id='string1_length_val'></span><br />
		String 2 length: <input id='string2_length' type='range' min='50' max='150' step='10' value='120'><span id='string2_length_val'></span><br />
		Gravity: <input id='gravity' type='range' min='5' max='15' step='1' value='10'><span id='gravity_val'></span>

	  <br />
		<br />
	  <button id='reset_pend'>Reset Pendulum</button><br />
	  <button id='go_pend'>Go!</button>
  </div>
</div>

<script src='doublePend.js'></script>

<?php include 'footer.html'; ?>
