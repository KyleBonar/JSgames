<?php include 'header.html'; ?>

<div id='contentHolder'>
	<h2>Double Pendulum</h2>
	<p>Text here</p>

	<hr />

	<div id='canvasHolder' style='width=80%'>
	</div>
	<div id='controlHolder'>
  Ball 1 mass: <input id='ball1_mass' type='range' min='1' max='20' step='1' value='10'><span id='ball1_mass_val'></span><br />
  Ball 2 mass: <input id='ball2_mass' type='range' min='1' max='20' step='1' value='10'><span id='ball2_mass_val'></span><br />
  String 1 length: <input id='string1_length' type='range' min='50' max='250' step='10' value='150'><span id='string1_length_val'></span><br />
	String 2 length: <input id='string2_length' type='range' min='50' max='250' step='10' value='150'><span id='string2_length_val'></span><br />
	Gravity: <input id='gravity' type='range' min='5' max='15' step='1' value='10'><span id='gravity_val'></span>

  <br>
  <button id='reset_pend'>Reset Pendulum</button>
  </div>
</div>

<script src='doublePend.js'></script>

<?php include 'footer.html'; ?>
