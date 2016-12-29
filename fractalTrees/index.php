<?php include 'header.html'; ?>

<div id='contentHolder'>
  <h2>Fractal Tree</h2>
  <p>Fractal Trees can be a fun visualization to represent a design which never ends and repeats itself. In this simple example, every branch creates two branches, which in turn, will each create two more branches, so forth and so on. To use this application, all you need to do is click on the canvas below! Each click will cause the existing branches to create their respective branch children using the angles, and length, you provide with the sliders. You can adjust these values at any time and reset the entire tree whenever you want.</p>
  <p>Note: An angle of 0 will make the either of the branches go straight relative to their parent branch. An angle of 90, on the right branch, relates to a branch that will grow perpendicular, to the right, relative to it's parent while 90 on th left branch relates to a branch that will grow perpendicular, to the left, relative to its parent.</p>
  <p>If all else fails, play around with the switches and have fun!</p>

  <hr />
  <div id='canvasHolder' style='width:80%'>
  </div>
  <div id='controlHolder'>
  Brach length: <input id='branch_length' type='range' min='5' max='20' step='1' value='17'><span id='branch_length_val'></span><br />
  Right branch angle: <input id='right_angle' type='range' min='0' max='90' step='10' value='20'><span id='right_angle_val'></span><br />
  Left branch angle: <input id='left_angle' type='range' min='0' max='90' step='10' value='20'><span id='left_angle_val'></span><br />
  <br>
  <br>
  <button id='reset_tree'>New Tree</button>
  </div>
</div>


<script src='branch.js'></script>
<script src='fractal.js'></script>

<?php include 'footer.html'; ?>
