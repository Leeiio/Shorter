<?php
/**
 * @Authot leeiio(http://leeiio.me)
 * @Version 0.1
 * @Description:转换地址为短地址
 */

$urls = array();
$get_long_urls = array();
$get_api = 'http://is.gd/api.php?longurl=';
//$long_urls = substr($_GET['long_urls'],0,-1);
$long_urls = substr($_GET['long_urls'],0,-11);
$urls = explode("leeiiosplit",$long_urls);

$long_urls_len = count($urls);

for($i=0;$i<$long_urls_len;$i++){
	$curl = curl_init();
	$url = $get_api.$urls[$i];
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	$data = curl_exec($curl);
	curl_close($curl);
	
	$short_urls .= $data.'|'.$urls[$i].'^';
}
echo substr($short_urls,0,-1);
?>
