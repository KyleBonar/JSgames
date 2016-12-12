<?php include 'header.html'; ?>

<div id='contentHolder'>
  <h2>Word Bubble Counter!</h2>
  <p>Place you text into the text area, found below, and then click the "Submit" button for the magic to work! This program attempts to remove unwanted characters, such as * or {, pushes all letters down to their lower case, and then counts the number of times each word appears in the text area. A graphical representation of the top most used words is shown. </p>
  <p>Two examples of this can be seen <a href='http://kylebonar.com/images/word_count_1.png' target='_blank'>here</a> and <a href='http://kylebonar.com/images/word_count_2.png' target='_blank'>here</a>. To generate these, I used the last two years of text messages between myself and my girlfriend. With each text message being a new line in my .txt file, there were over 32,000 lines and over 8000 unique words.</p>
  <textarea id='word_blob'></textarea>
  <input type='submit' id='submit' value='submit'>
  <hr />
</div>

<script src='counter.js'></script>
<?php include 'footer.html'; ?>
