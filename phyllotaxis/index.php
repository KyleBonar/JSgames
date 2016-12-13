<?php include 'header.html'; ?>

<div id='contentHolder'>
  <h2>Phyllotaxis Clicker</h2>
  <p>Click anywhere in the canvas to create a phyllotaxis image! The algorithm used to create this application, as well as a ton of other good information, can be found in <a href='http://algorithmicbotany.org/papers/abop/abop-ch4.pdf'>this</a> PDF. </p>
  <p>You can see a real life example of phyllotaxis right <a href='http://www.encyclopedia.com/sites/default/files/styles/max_300_wide/public/17/6255742.jpg?itok=47lakZru'>here!</a>
  <div class='dropdownSection'>
    Select critical angle:
    <select id='angle'>
      <option value='137.3'>137.3</option>
      <option value='137.5' selected>137.5</option>
      <option value='137.6'>137.6</option>
    </select>
  </div>
  <div class='dropdownSection'>
    Select size of flower:
    <select id='size'>
      <option value='150'>small</option>
      <option value='350' selected>medium</option>
      <option value='600'>large</option>
    </select>
  </div>
  <hr />
</div>

<script src='phyllotaxis.js'></script>
<?php include 'footer.html'; ?>
