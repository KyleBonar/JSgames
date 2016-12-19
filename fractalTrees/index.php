<?php include 'header.html'; ?>

<div id='contentHolder'>
  <h2>Phyllotaxis Clicker</h2>
  <p>Click anywhere in the canvas to create a phyllotaxis image! The algorithm used to create this application, as well as a ton of other good information, can be found in <a href='http://algorithmicbotany.org/papers/abop/abop-ch4.pdf'>this</a> PDF. </p>
  Tree size: <input id='tree_size' type='range' min='1' max='15' step='1' value='8'><span id='tree_size_val'></span>
  <br>
  Brnch depth: <input id='branch_depth' type='range' min='5' max='25' step='1' value='17'><span id='branch_depth_val'></span>
  <br>
  Right branch angle: <input id='right_angle' type='range' min='-90' max='90' step='10' value='20'><span id='right_angle_val'></span>
  <br>
  Left branch angle: <input id='left_angle' type='range' min='-90' max='90' step='10' value='20'><span id='left_angle_val'></span>
  <br>
  <button id='reset_tree'>New Tree</button>
  <hr />
</div>

<script src='fractal.js'></script>
<?php include 'footer.html'; ?>
