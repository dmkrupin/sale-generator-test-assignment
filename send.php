<?php 
    $email = $_POST['fields[771789_1][410009]'];
    $tel = $_POST['fields[771787_1][409997]'];

    $email = htmlspecialchars($email);
    $tel = htmlspecialchars($tel);

    $email = urldecode($email);
    $tel = urldecode($tel);

    $email = trim($email);
    $tel = trim($tel);

    mail("order@salesgenerator.pro", "Заявка Крупин", "Номер телефона:".$tel.". E-mail: ".$email ,"From: test@mail.ru \r\n");

?>

