<!DOCTYPE html>
<html lang="en">
	<head>
		<title>
			Poker.js
		</title>
		<link rel="stylesheet" type="text/css" href="includes/css/normalize.css" />
		<link rel="stylesheet" type="text/css" href="includes/css/bootstrap.css" media="screen" />
		<link rel="stylesheet" type="text/css" href="includes/css/bootstrap-responsive.css" media="screen" />
		<link rel="stylesheet" type="text/css" href="includes/css/style.css" media="screen" />
	</head>
	<body>
		<div id="account">
			<div id="manage">
				<div id="close">
					X
				</div>
				<span>
					Sign In
				</span>
				<p id="instructions">
					Ready to start playing? Sign in below to access your account funds.
					<br />
					If you do not have an active account, one will be created for you.
				</p>
				<input type="text" id="username" placeholder="Username">
				<input type="password" id="password" placeholder="Password">
				<button id="access" class="btn btn-primary">
					Go!
				</button>
			</div>
		</div>
		<div id="status" class="navbar navbar-inverse">
			<div id="status-inner" class="navbar-inner">
				<div class="row-fluid">
					<div id="update" class="span9">
						Waiting for players...
					</div>
					<div id="users" class="span3">
						<span>
							0 Players
						</span>
						0 Guests
					</div>
				</div>
			</div>
		</div>
		<div class="container-fluid">
			<div class="row-fluid">
				<div class="span9">
					<div class="row-fluid">
						<div id="funds-symbol">
							$
						</div>
						<div id="funds">
							0
						</div>
						<div id="gametype">
							No Limit Texas Hold 'Em - $50 Blind
						</div>
					</div>
					<div class="row-fluid">
						<div class="span4" id="hand">
							<span>
								Your Hand
							</span>
							<div class="card" id="hand1">
							</div>
							<div class="divider">
							</div>
							<div class="card" id="hand2">
							</div>
						</div>
						<div class="span8" id="community">
							<span>
								Community Cards
							</span>
							<div class="card" id="community1">
							</div>
							<div class="divider">
							</div>
							<div class="card" id="community2">
							</div>
							<div class="divider">
							</div>
							<div class="card" id="community3">
							</div>
							<div class="divider">
							</div>
							<div class="card" id="community4">
							</div>
							<div class="divider">
							</div>
							<div class="card" id="community5">
							</div>
						</div>
					</div>
					<div id="players" class="row-fluid">
						<div id="p1" class="player span2">
							<div class="hide open">
								<span>
									Open Seat
								</span>
								<button class="claim btn btn-inverse">
									Sit Down
								</button>
							</div>
							<div class="hide details">
								<div class="identity">
									<div class="attributes">
										<div class="hide dealer">
											<span>
												D
											</span>
										</div>
										<div class="hide big">
											<span>
												B
											</span>
										</div>
										<div class="hide small">
											<span>
												b
											</span>
										</div>
									</div>
									<span class="name">
									</span>
								</div>
								<span class="funds">
								</span>
								<span class="status">
								</span>
							</div>
						</div>
						<div id="p2" class="player span2">
							<div class="hide open">
								<span>
									Open Seat
								</span>
								<button class="claim btn btn-inverse">
									Sit Down
								</button>
							</div>
							<div class="hide details">
								<div class="identity">
									<div class="attributes">
										<div class="hide dealer">
											<span>
												D
											</span>
										</div>
										<div class="hide big">
											<span>
												B
											</span>
										</div>
										<div class="hide small">
											<span>
												b
											</span>
										</div>
									</div>
									<span class="name">
									</span>
								</div>
								<span class="funds">
								</span>
								<span class="status">
								</span>
							</div>
						</div>
						<div id="p3" class="player span2">
							<div class="hide open">
								<span>
									Open Seat
								</span>
								<button class="claim btn btn-inverse">
									Sit Down
								</button>
							</div>
							<div class="hide details">
								<div class="identity">
									<div class="attributes">
										<div class="hide dealer">
											<span>
												D
											</span>
										</div>
										<div class="hide big">
											<span>
												B
											</span>
										</div>
										<div class="hide small">
											<span>
												b
											</span>
										</div>
									</div>
									<span class="name">
									</span>
								</div>
								<span class="funds">
								</span>
								<span class="status">
								</span>
							</div>
						</div>
						<div id="p4" class="player span2">
							<div class="hide open">
								<span>
									Open Seat
								</span>
								<button class="claim btn btn-inverse">
									Sit Down
								</button>
							</div>
							<div class="hide details">
								<div class="identity">
									<div class="attributes">
										<div class="hide dealer">
											<span>
												D
											</span>
										</div>
										<div class="hide big">
											<span>
												B
											</span>
										</div>
										<div class="hide small">
											<span>
												b
											</span>
										</div>
									</div>
									<span class="name">
									</span>
								</div>
								<span class="funds">
								</span>
								<span class="status">
								</span>
							</div>
						</div>
						<div id="p5" class="player span2">
							<div class="hide open">
								<span>
									Open Seat
								</span>
								<button class="claim btn btn-inverse">
									Sit Down
								</button>
							</div>
							<div class="hide details">
								<div class="identity">
									<div class="attributes">
										<div class="hide dealer">
											<span>
												D
											</span>
										</div>
										<div class="hide big">
											<span>
												B
											</span>
										</div>
										<div class="hide small">
											<span>
												b
											</span>
										</div>
									</div>
									<span class="name">
									</span>
								</div>
								<span class="funds">
								</span>
								<span class="status">
								</span>
							</div>
						</div>
						<div id="p6" class="player span2">
							<div class="hide open">
								<span>
									Open Seat
								</span>
								<button class="claim btn btn-inverse">
									Sit Down
								</button>
							</div>
							<div class="hide details">
								<div class="identity">
									<div class="attributes">
										<div class="hide dealer">
											<span>
												D
											</span>
										</div>
										<div class="hide big">
											<span>
												B
											</span>
										</div>
										<div class="hide small">
											<span>
												b
											</span>
										</div>
									</div>
									<span class="name">
									</span>
								</div>
								<span class="funds">
								</span>
								<span class="status">
								</span>
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div id="actions" class="span8">
							<div class="row-fluid">
								<div class="action span4">
									<div class="selector">
										<div id="selected">
										</div>
									</div>
									<div class="selector-text">
										<span>
											Raise
										</span>
										Increase the stakes.
									</div>
								</div>
								<div class="action span4">
									<div class="selector">
									</div>
									<div class="selector-text">
										<span>
											Check / Call
										</span>
										Match current bet.
									</div>
								</div>
								<div class="action span4">
									<div class="selector">
									</div>
									<div class="selector-text">
										<span>
											Fold
										</span>
										Discard your hand.
									</div>
								</div>
							</div>
							<div id="sub-actions" class="span8">
								<div class="row-fluid">
									<div id="raise" class="span3">
										<div class="input-prepend">
											<span class="add-on">$</span>
											<input class="input-medium" id="prependedInput" type="text" placeholder="Raise Amount">
										</div>
									</div>
									<div id="sub-status" class="span6">
									</div>
								</div>
							</div>
						</div>
						<div class="span1">
						</div>
						<div id="pot" class="span3">
							<div class="row-fluid">
								<div class="arrow span2">
									>
								</div>
								<div id="pot-container" class="span10">
									<span>
										Pot Value
									</span>
									<div id="pot-symbol">
										$
									</div>
									<div id="pot-value">
										0
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="span3">
					<div id="chat">
						<div id="chat-messages">
						</div>
						<div id="chat-input" class="input-append">
							<input id="message" class="input-small" id="appendedInputButton" type="text">
							<button id="send" class="btn btn-inverse" type="button">Send</button>
						</div>
					</div>
					<p id="footer">
						&copy; Blaurock 2012<br />All Rights Reserved
					</p>
				</div>
			</div>
		</div>
<?php
		if($_SERVER['REMOTE_ADDR'] == '::1') {
				$host = 'localhost';
		} else {
			$host = 'PUBLIC_IP';
		}
?>
		<input type="hidden" id="ip" value="localhost" />
		<script data-main="includes/js/init" src="includes/js/lib/require.js"></script>
	</body>
</html>