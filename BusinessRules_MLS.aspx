<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="BusinessRules_MLS.aspx.cs" Inherits="MLS_Manager.BusinessRules_MLS" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<style>
		.panel-default > .panel-heading-custom {
			background: #142541;
			color: #fff; 
		}

		.tabs .indicator {
			background-color: #367fa9 !important;
			height: 5px;
		}

		.tabs .tab a.active {
			color: #01579b;
			font-weight: bold !important;
			background-color: #e0f2f1;
		}

		.tabs .tab a:hover {
			color: #367fa9;
		}

		.tabs .tab a {
			color: black;
		}

		.btn > .fa-hover-cos:hover {
			color: #2697b9;
		}

		.rowHover:hover {
			cursor: pointer;
			color: #000;
			background-color: #eff8b3;
		}

		.activeRow {
			color: #fff;
			background-color: #4d6578;
		}

		.minibtn {
			height: 30px;
			line-height: 30px;
			padding: 0 0.5rem;
		}

		.shadow {
			-moz-box-shadow: inset 0 0 10px #000000;
			-webkit-box-shadow: inset 0 0 10px #000000;
			box-shadow: inset 0 0 10px #000000;
		}


		/*Vertical tab*/
		.tabs-vertical .tabs {
			height: auto;
			-ms-flex-direction: column;
			-webkit-flex-direction: column;
			flex-direction: column;
		}

		.tabs-vertical .tab {
			width: 100%;
			-webkit-box-flex: 1;
			-webkit-flex-grow: 1;
			-ms-flex-positive: 1;
			flex-grow: 1;
			display: block;
			float: left;
			text-align: left;
			line-height: 48px;
			height: 48px;
			padding: 0;
			margin: 0;
			text-transform: uppercase;
			text-overflow: ellipsis;
		}

			.tabs-vertical .tab .active {
				-moz-transition: border-color .5s ease;
				-o-transition: border-color .5s ease;
				-webkit-transition: border-color .5s ease;
				transition: border-color .5s ease;
				border-right: 5px solid #01579b;
				/*color: #3f51b5;*/
				color: #01579b;
				font-weight: bold !important;
				/*background-color: #b2dfdb;*/
				background-color: #e0f2f1;
			}

			.tabs-vertical .tab a {
				color: black;
				display: block;
				width: 100%;
				height: 100%;
				text-overflow: ellipsis;
				overflow: hidden;
				-webkit-transition: color 0.28s ease;
				-moz-transition: color 0.28s ease;
				-o-transition: color 0.28s ease;
				-ms-transition: color 0.28s ease;
				transition: color 0.28s ease;
				box-shadow: 0px 0px 0px 1px rgba(10, 11, 49, 0.2);
				border-right: 2px solid rgba(10, 11, 49, 0.2);
			}

				.tabs-vertical .tab a:hover {
					color: #367fa9;
				}

			.tabs-vertical .tab.disabled a {
				color: #8591d5;
				cursor: default;
			}

		.tabs-vertical .indicator {
			display: none;
		}
	</style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
	<div class="container-fluid" style="margin: 0px !important">
		<div class="content-wrapper" style="margin-left: 0; padding: 0">
			<section class="content-header">
			</section>
			<section class="content" style="padding-bottom: 5px">
				<div class="col-md-3" style="min-height: 100%;">
					<div class="panel panel-default" style="height: 100%;">
						<div class="panel-heading panel-heading-custom">
							<h1 class="panel-title text-center" style="font-weight: 600;">MLS Website</h1>
						</div>
						<div class="panel-body hoverable" style="height: 600px; overflow: auto;">
							<div class="row">
								<div class="input-field">
									<input value="" id="txtSearchMLS" type="text" class="validate" />
									<label class="active" for="txtSearchMLS">Enter MLS Name</label>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									<table id="tblMLS" class="table no-border highlight">
										<tbody>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-9" style="min-height: 100%;">
					<div class="panel panel-default" style="height: 100%;">
						<div id="cloneDiv" style="height: 608px;"></div>
						<div class="panel-body" style="height: 100%">
							<div class="row" id="hideTab" style="display: none;">
								<ul id="tabs-swipe-demo" class="tabs">
									<li class="tab col s3 hoverable z-depth-1" style="font-weight: 600;" id="swipe1"><a href="#test-swipe-1">Coverage</a></li>
									<li class="tab col s3 hoverable z-depth-1" id="swipe2" style="font-weight: 600;"><a href="#test-swipe-2">Data Required</a></li>
									<li class="tab col s3 hoverable z-depth-1" id="swipe3" style="font-weight: 600;"><a href="#test-swipe-3">My Assistant</a></li>
								</ul>
								<div id="test-swipe-1" class="col m12">
									<div class="row no-margin">
										<div class="col m4" style="min-height: 30%; margin-top: 3%;">
											<div class="panel panel-default">
												<div class="panel-heading panel-heading-custom">
													<h1 class="panel-title text-center">State</h1>
												</div>
												<div class="panel-body hoverable" style="overflow: auto; height: 220px;">
													<div class="row no-margin">
														<div class="input-field no-margin">
															<input value="" id="txtSearchState" type="text" class="validate no-margin" style="margin-bottom: 7% !important;" />
															<label class="active" for="txtSearchState">Search</label>
														</div>
													</div>
													<div class="row">
														<div class="col-lg-12">
															<table id="tblState" class="table no-border highlight">
																<tbody>
																</tbody>
															</table>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="col m1">
										</div>
										<div class="col m4" style="min-height: 30%; margin-top: 3%;">
											<div class="panel panel-default">
												<div class="panel-heading panel-heading-custom">
													<h1 class="panel-title text-center">Zip Code</h1>
												</div>
												<div class="panel-body hoverable" style="overflow: auto; height: 220px;">
													<div class="row no-margin">
														<div class="input-field no-margin">
															<input value="" id="txtSearchZipCode" type="text" class="validate no-margin" style="margin-bottom: 7% !important;" />
															<label class="active" for="txtSearchZipCode">Search</label>
														</div>
													</div>
													<div class="row">
														<div class="col-lg-12">
															<table id="tblZipCode" class="table no-border highlight">
																<thead>
																</thead>
																<tbody>
																</tbody>
															</table>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="col m3 center-align" style="min-height: 30%; margin-top: 1%; line-height: 19;">
											<button type="button" class="waves-effect btn btn-small" id="btnAdd"><i class="fa fa-plus" style="font-size: 12px; padding-right: 5px;"></i>ADD</button>
										</div>
									</div>
									<div class="row no-margin">
										<div class="col m4 center-align" style="min-height: 30%; margin-top: 1%;">
											<div class="panel panel-default">
												<div class="panel-heading panel-heading-custom">
													<h1 class="panel-title text-center">Covered States</h1>
												</div>
												<div class="panel-body hoverable" style="overflow: auto; height: 220px;">
													<div class="row">
														<div class="col m12">
															<table id="tblCoveredState" class="table no-border highlight">
																<tbody></tbody>
															</table>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="col m1"></div>
										<div class="col m4 center-align" style="min-height: 30%; margin-top: 1%;">
											<div class="panel panel-default">
												<div class="panel-body hoverable" style="overflow: auto; height: 260px;">
													<div class="row">
														<table id="tblCoveredStatesZip" class="table no-border highlight">
															<tbody>
															</tbody>
														</table>
													</div>
												</div>
											</div>
										</div>
										<div class="col m3 center-align" style="min-height: 30%; margin-top: 1%; line-height: 19;">
											<button class="waves-effect waves-light btn" id="btnRemove" type="button"><i class="fa fa-remove" style="font-size: 14px; padding-right: 5px;"></i>REMOVE</button>
										</div>
									</div>
								</div>
								<div id="test-swipe-2" class="col m12">
									<div class="row">
										<div class="col m4" style="min-height: 100%; margin-top: 3%;">
											<%-- <div class="row">
												<button type="button" class="waves-effect waves-light btn" id="btnStandard" style="width: -webkit-fill-available;">
													Standard
												<i class="material-icons right">arrow_drop_down</i>
												</button>
											</div>
											<div class="row">
												<button type="button" class="waves-effect waves-light btn" id="btnListing" style="width: -webkit-fill-available;">
													Listing Terms
												<i class="material-icons right">arrow_drop_down</i>
												</button>
											</div>
											<div class="row">
												<button type="button" class="waves-effect waves-light btn" id="btnPropertyDetails" style="width: -webkit-fill-available;">
													Property Details
												<i class="material-icons right">arrow_drop_down</i>
												</button>
											</div>
											<div class="row">
												<button type="button" class="waves-effect waves-light btn" id="btnSchool" style="width: -webkit-fill-available;">
													School Information
												<i class="material-icons right">arrow_drop_down</i>
												</button>
											</div>
											<div class="row">
												<button type="button" class="waves-effect waves-light btn" id="btnPropertyFees" style="width: -webkit-fill-available;">
													Property Fees
												<i class="material-icons right">arrow_drop_down</i>
												</button>
											</div>
											<div class="row">
												<button type="button" class="waves-effect waves-light btn" id="btnFeatures" style="width: -webkit-fill-available;">
													Features
												<i class="material-icons right">arrow_drop_down</i>
												</button>
											</div>--%>
											<div class="tabs-vertical ">
												<div class="col s12 m12 l12">
													<ul class="tabs hoverable">
														<li class="tab hoverable">
															<a class="waves-effect waves-cyan" href="" id="btnStandard" style="font-weight: 600;"><i class="zmdi zmdi-apps"></i>Standard</a>
														</li>
														<li class="tab hoverable">
															<a class="waves-effect waves-cyan" href="" id="btnListing" style="font-weight: 600;"><i class="zmdi zmdi-email"></i>Listing Terms</a>
														</li>
														<li class="tab hoverable">
															<a class="waves-effect waves-cyan" href="" id="btnPropertyDetails" style="font-weight: 600;"><i class="zmdi zmdi-apps"></i>Property Details</a>
														</li>
														<li class="tab hoverable">
															<a class="waves-effect waves-cyan" href="" id="btnSchool" style="font-weight: 600;"><i class="zmdi zmdi-apps"></i>School Information</a>
														</li>
														<li class="tab hoverable">
															<a class="waves-effect waves-cyan" href="" id="btnPropertyFees" style="font-weight: 600;"><i class="zmdi zmdi-apps"></i>Property Fees</a>
														</li>
														<li class="tab hoverable">
															<a class="waves-effect waves-cyan" href="" id="btnFeatures" style="font-weight: 600;"><i class="zmdi zmdi-apps"></i>Features</a>
														</li>
													</ul>
												</div>
												<div class="col s8 m9 l6">
													<div id="appsDir" class="tab-content"></div>
													<div id="emailDir" class="tab-content"></div>
													<div id="codeDir" class="tab-content"></div>
												</div>
											</div>
										</div>
										<div class="col m1"></div>
										<div class="col m6" style="margin-top: 3%;">
											<div class="panel panel-default" style="min-height: 100%; height: 100%; width: 100%;">
												<div class="panel-body hoverable" style="height: 495px; overflow: auto;">
													<div class="row">
														<div class="col-lg-12">
															<table id="tblDetails" class="table no-border highlight">
																<tbody>
																</tbody>
															</table>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="row" style="margin-bottom: 0px;">
										<button type="button" class="waves-effect waves-light btn pull-right" id="btnSave">
											<i class="fa fa-save" style="font-size: 15px; padding-right: 5px;"></i>
											Save
										</button>
									</div>
								</div>
								<div id="test-swipe-3" class="col m12">
									<div class="row" style="margin-top: 3%;">
										<h5>Queue to My Assistant?</h5>
									</div>
									<div class="row no-margin">
										<div class="col m1"></div>
										<div class="col m3" style="font-size: 17px;">
											Initial Listing
										</div>
										<div class="col m2">
											<div class="form-group">
												<select class="form-control input-sm hoverable" id="slctInitialListing">
													<option value="" disabled selected>Choose Option</option>
													<option value="true">Yes</option>
													<option value="false">No</option>
												</select>
											</div>
										</div>
									</div>
									<div class="row no-margin">
										<div class="col m1"></div>
										<div class="col m3" style="font-size: 17px;">
											Listing Quality
										</div>
										<div class="col m2">
											<div class="form-group">
												<select class="form-control input-sm hoverable" id="slctListingQuality">
													<option value="" disabled selected>Choose Option</option>
													<option value="true">Yes</option>
													<option value="false">No</option>
												</select>
											</div>
										</div>
									</div>
									<div class="row no-margin">
										<div class="col m1"></div>
										<div class="col m3" style="font-size: 17px;">
											Price Change
										</div>
										<div class="col m2">
											<div class="form-group">
												<select class="form-control input-sm hoverable" id="slctPriceChange">
													<option value="" disabled selected>Choose Option</option>
													<option value="true">Yes</option>
													<option value="false">No</option>
												</select>
											</div>
										</div>
									</div>
									<div class="row no-margin">
										<div class="col m1"></div>
										<div class="col m3" style="font-size: 17px;">
											Status Change
										</div>
										<div class="col m2">
											<div class="form-group">
												<select class="form-control input-sm hoverable" id="slctStatusChange">
													<option value="" disabled selected>Choose Option</option>
													<option value="true">Yes</option>
													<option value="false">No</option>
												</select>
											</div>
										</div>
									</div>
									<div class="row no-margin">
										<div class="col m1"></div>
										<div class="col m3" style="font-size: 17px;">
											Preview Listings
										</div>
										<div class="col m2">
											<div class="form-group">
												<select class="form-control input-sm hoverable" id="slctPreviewListing">
													<option value="" disabled selected>Choose Option</option>
													<option value="true">Yes</option>
													<option value="false">No</option>
												</select>
											</div>
										</div>
									</div>
									<div class="row no-margin">
										<div class="col m1"></div>
										<div class="col m3" style="font-size: 17px;">
											Lockbox Code Change
										</div>
										<div class="col m2">
											<div class="form-group">
												<select class="form-control input-sm hoverable" id="slctLockBoxCode">
													<option value="" disabled selected>Choose Option</option>
													<option value="true">Yes</option>
													<option value="false">No</option>
												</select>
											</div>
										</div>
									</div>
									<div class="row no-margin">
										<div class="col m1"></div>
										<div class="col m3" style="font-size: 17px;">
											Listing Corrections
										</div>
										<div class="col m2">
											<div class="form-group">
												<select class="form-control input-sm hoverable" id="slctListingCorrections">
													<option value="" disabled selected>Choose Option</option>
													<option value="true">Yes</option>
													<option value="false">No</option>
												</select>
											</div>
										</div>
									</div>
									<div class="row">
										<button type="button" class="waves-effect waves-light btn pull-right" id="btnSaveMyAssistant">
											<i class="fa fa-save" style="font-size: 15px; padding-right: 5px;"></i>
											Save
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="script" runat="server">

	<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>
	<script src="BusinessRulesJS/Custom%20Alertify/alertify/alertify.js"></script>
	<script src="BusinessRulesJS/BusinessRules_MLS.js"></script>
</asp:Content>
