# Datasets and Evaluation

This index follows Tables 3–6 of the current ACM manuscript. The 71 datasets are grouped by their primary evaluation use: 3D reconstruction, NVS, and other downstream tasks.

A supported task means that the dataset provides observations or annotations that support the corresponding evaluation. Counts reproduce the manuscript's #Scenes column. For Oxford RobotCar, OmniWorld, and SPair-71k, the parenthesized frame or pair count indicates scale because a scene count was not identified in the cited source.

[Interactive dataset explorer and evaluation tables](https://richardchen225.github.io/vggt_survey/#benchmarks)

## 3D reconstruction (46 datasets)

| Dataset | #Scenes | Type | Source | Supported evaluation tasks |
|---|---:|---|---|---|
| [DTU](https://doi.org/10.1109/cvpr.2014.59) | 124 | Object | Real | Camera pose; 3D reconstruction; NVS |
| [TUM-dynamics](https://doi.org/10.1109/iros.2012.6385773) | 1 | Indoor | Real | Camera pose; Depth; Long stream; Dynamic / 4D; SLAM |
| [ADT](https://doi.org/10.1109/iccv51070.2023.01842) | 2 | Indoor | Real | Camera pose; Depth; 3D reconstruction; Dynamic / 4D; Semantic 3D scene understanding |
| [EuRoC MAV](https://doi.org/10.1177/0278364915620033) | 3 | Indoor | Real | Camera pose; Long stream; SLAM |
| [TUM RGB-D](https://doi.org/10.1109/iros.2012.6385773) | 4 | Indoor | Real | Camera pose; Depth; 3D reconstruction; Long stream; SLAM |
| [7-Scenes](https://doi.org/10.1109/cvpr.2013.377) | 7 | Indoor | Real | Camera pose; Depth; 3D reconstruction; Long stream; SLAM |
| [NRGBD](https://doi.org/10.1109/cvpr52688.2022.00619) | 10 | Indoor | Synthetic | Camera pose; Depth; 3D reconstruction; Long stream |
| [Replica360-2K](https://doi.org/10.1109/CVPR52688.2022.00374) | 13 | Indoor | Synthetic | Depth |
| [Replica](https://arxiv.org/abs/1906.05797) | 18 | Indoor | Synthetic | Camera pose; Depth; 3D reconstruction; NVS; SLAM; Semantic 3D scene understanding |
| [Bonn](https://doi.org/10.1109/iros40897.2019.8967590) | 24 | Indoor | Real | Camera pose; Depth; 3D reconstruction; Long stream; Dynamic / 4D; SLAM |
| [Matterport3D](https://doi.org/10.1109/3dv.2017.00081) | 90 | Indoor | Real | Depth; 3D reconstruction; Semantic 3D scene understanding |
| [Dark3R](https://openaccess.thecvf.com/content/CVPR2026/html/Guo_Dark3R_Learning_Structure_from_Motion_in_the_Dark_CVPR_2026_paper.html) | 104 | Indoor | Real | Camera pose; Depth |
| [Stanford2D3D](https://arxiv.org/abs/1702.01105) | 271 | Indoor | Real | Depth; 3D reconstruction; Semantic 3D scene understanding |
| [NYU-v2](https://doi.org/10.1007/978-3-642-33715-4_54) | 464 | Indoor | Real | Depth; Semantic 3D scene understanding |
| [ScanNet++ v2](https://doi.org/10.1109/ICCV51070.2023.00008) | 1,006 | Indoor | Real | Camera pose; Depth; 3D reconstruction; NVS; SLAM; Semantic 3D scene understanding |
| [ScanNet v2](https://doi.org/10.1109/cvpr.2017.261) | 1,513 | Indoor | Real | Camera pose; Depth; 3D reconstruction; SLAM; Semantic 3D scene understanding |
| [ScanNet200](https://arxiv.org/abs/2204.07761) | 1,513 | Indoor | Real | Camera pose; Depth; 3D reconstruction; SLAM; Semantic 3D scene understanding |
| [ARKitScenes](https://arxiv.org/abs/2111.08897) | 1,661 | Indoor | Real | Camera pose; Depth; 3D reconstruction; Semantic 3D scene understanding |
| [EventScape](https://doi.org/10.1109/lra.2021.3060707) | 4 | Outdoor | Synthetic | Depth; Dynamic / 4D; Semantic 3D scene understanding |
| [Nordland](https://dblp.org/rec/conf/icra/SunderhaufNP13.html) | 4 | Outdoor | Real | Long stream; SLAM |
| [Cambridge Landmarks](https://doi.org/10.1109/iccv.2015.336) | 5 | Outdoor | Real | Camera pose; SLAM |
| [Virtual KITTI 2](https://arxiv.org/abs/2001.10773) | 5 | Outdoor | Synthetic | Camera pose; Depth; 3D reconstruction; Long stream; Dynamic / 4D |
| [Oxford Spires](https://arxiv.org/abs/2411.10546) | 6 | Outdoor | Real | Camera pose; 3D reconstruction; Long stream; NVS; SLAM |
| [DENSE](https://doi.org/10.1109/3dv50981.2020.00063) | 8 | Outdoor | Synthetic | Depth |
| [KITTI-360](https://doi.org/10.1109/tpami.2022.3179507) | 11 | Outdoor | Real | Camera pose; Depth; 3D reconstruction; Long stream; Dynamic / 4D; SLAM; Semantic 3D scene understanding; World models |
| [PointOdyssey](https://openaccess.thecvf.com/content/ICCV2023/html/Zheng_PointOdyssey_A_Large-Scale_Synthetic_Dataset_for_Long-Term_Point_Tracking_ICCV_2023_paper.html) | 20 | Outdoor | Synthetic | Camera pose; Depth; Long stream; Dynamic / 4D |
| [KITTI Odometry](https://doi.org/10.1109/cvpr.2012.6248074) | 22 | Outdoor | Real | Camera pose; Depth; 3D reconstruction; Long stream; SLAM |
| [TartanAir](https://doi.org/10.1109/iros45743.2020.9341801) | 30 | Outdoor | Synthetic | Camera pose; Depth; 3D reconstruction; Long stream; Dynamic / 4D; SLAM; Semantic 3D scene understanding; World models |
| [MegaDepth](https://doi.org/10.1109/cvpr.2018.00218) | 196 | Outdoor | Real | Depth; 3D reconstruction |
| [nuScenes](https://doi.org/10.1109/cvpr42600.2020.01164) | 1,000 | Outdoor | Real | Camera pose; Depth; Dynamic / 4D; NVS; Semantic 3D scene understanding; World models |
| [Waymo](https://doi.org/10.1109/cvpr42600.2020.00252) | 1,150 | Outdoor | Real | Camera pose; Depth; Long stream; Dynamic / 4D; NVS; Semantic 3D scene understanding; World models |
| [Oxford RobotCar](https://doi.org/10.1177/0278364916679498) | - (~20M frames) | Outdoor | Real | Camera pose; Long stream; SLAM |
| [LaMAR](https://doi.org/10.1007/978-3-031-20071-7_40) | 3 | Indoor / outdoor | Real | Camera pose; SLAM |
| [STheReO](https://doi.org/10.1109/iros47612.2022.9981857) | 3 | Indoor / outdoor | Real | Camera pose; Depth |
| FIORD | 10 | Indoor / outdoor | Real | Camera pose; Depth; 3D reconstruction |
| [MVSEC](https://doi.org/10.1109/lra.2018.2800793) | 11 | Indoor / outdoor | Real | Camera pose; Depth; Long stream; SLAM |
| BEDLAM2.0 | 15 | Indoor / outdoor | Synthetic | Camera pose; Depth; Dynamic / 4D |
| [Tanks and Temples](https://doi.org/10.1145/3072959.3073599) | 21 | Indoor / outdoor | Real | 3D reconstruction; NVS |
| [ETH3D](https://doi.org/10.1109/cvpr.2017.272) | 25 | Indoor / outdoor | Real | Camera pose; Depth; 3D reconstruction |
| [NCLT](https://doi.org/10.1177/0278364915614638) | 27 | Indoor / outdoor | Real | Camera pose; Long stream; SLAM |
| [TUM-VI](https://doi.org/10.1109/IROS.2018.8593419) | 28 | Indoor / outdoor | Real | Camera pose; Long stream; SLAM |
| [Sintel](https://doi.org/10.1007/978-3-642-33783-3_44) | 35 | Indoor / outdoor | Synthetic | Camera pose; Depth; Dynamic / 4D |
| [ViViD++](https://doi.org/10.1109/lra.2022.3168335) | 36 | Indoor / outdoor | Real | Camera pose; Depth |
| [DAVIS](https://doi.org/10.1109/cvpr.2016.85) | 50 | Indoor / outdoor | Real | Dynamic / 4D; NVS; Semantic 3D scene understanding |
| [Kubric](https://openaccess.thecvf.com/content/CVPR2022/html/Greff_Kubric_A_Scalable_Dataset_Generator_CVPR_2022_paper.html) | 10,000 | Indoor / outdoor | Synthetic | Camera pose; Depth; 3D reconstruction; Dynamic / 4D |
| [OmniWorld](https://arxiv.org/abs/2509.12201) | - (18.515M frames) | Indoor / outdoor | Real + Synthetic | Camera pose; Depth; 3D reconstruction; Dynamic / 4D; World models |

## NVS (10 datasets)

| Dataset | #Scenes | Type | Source | Supported evaluation tasks |
|---|---:|---|---|---|
| [CO3Dv2](https://doi.org/10.1109/iccv48922.2021.01072) | 51 | Object | Real | Camera pose; 3D reconstruction; NVS |
| [NVS-HO](https://arxiv.org/abs/2602.05822) | 67 | Object | Real | NVS |
| [Deep Blending](https://doi.org/10.1145/3272127.3275084) | 19 | Indoor | Real | NVS |
| [ACID](https://doi.org/10.1109/iccv48922.2021.01419) | 891 | Outdoor | Real | NVS |
| [DyCheck](https://doi.org/10.52202/068431-2447) | 7 | Indoor / outdoor | Real | Camera pose; Depth; Dynamic / 4D; NVS |
| [LLFF](https://doi.org/10.1145/3306346.3322980) | 8 | Indoor / outdoor | Real | NVS |
| [Mip-NeRF 360](https://doi.org/10.1109/cvpr52688.2022.00539) | 9 | Indoor / outdoor | Real | NVS |
| [HyperNeRF](https://doi.org/10.1145/3450626.3459882) | 10 | Indoor / outdoor | Real | Dynamic / 4D; NVS |
| [RealEstate10K](https://doi.org/10.1145/3197517.3201323) | ~10,000 | Indoor / outdoor | Real | Camera pose; NVS; World models |
| [DL3DV-10K](https://doi.org/10.1109/cvpr52733.2024.02092) | 10,510 | Indoor / outdoor | Real | Camera pose; NVS; World models |

## Other downstream tasks (15 datasets)

| Dataset | #Scenes | Type | Source | Supported evaluation tasks |
|---|---:|---|---|---|
| [SPair-71k](https://doi.org/10.1109/ICCV.2019.00372) | - (70,958 pairs) | Object | Real | Semantic 3D scene understanding |
| [SIMPLER](https://arxiv.org/abs/2405.05941) | 8 | Indoor | Synthetic | Embodied action and planning |
| [CALVIN](https://doi.org/10.1109/lra.2022.3180108) | 34 | Indoor | Synthetic | World models; Embodied action and planning |
| [MetaWorld](https://proceedings.mlr.press/v100/yu20a.html) | 50 | Indoor | Synthetic | Embodied action and planning |
| [RoboTwin 2.0](https://arxiv.org/abs/2506.18088) | 50 | Indoor | Synthetic | World models; Embodied action and planning |
| [HOI4D](https://openaccess.thecvf.com/content/CVPR2022/html/Liu_HOI4D_A_4D_Egocentric_Dataset_for_Category-Level_Human-Object_Interaction_CVPR_2022_paper.html) | 57 | Indoor | Real | Depth; 3D reconstruction; Dynamic / 4D; Semantic 3D scene understanding; Embodied action and planning |
| [ManiSkill 3](https://arxiv.org/abs/2410.00425) | 58 | Indoor | Synthetic | Embodied action and planning |
| [DROID](https://doi.org/10.15607/rss.2024.xx.120) | 86 | Indoor | Real | World models; Embodied action and planning |
| [LIBERO](https://arxiv.org/abs/2306.03310) | 130 | Indoor | Synthetic | World models; Embodied action and planning |
| [MVRefer](https://openaccess.thecvf.com/content/CVPR2026/html/Wu_MVGGT_Multimodal_Visual_Geometry_Grounded_Transformer_for_Multiview_3D_Referring_CVPR_2026_paper.html) | 1,513 | Indoor | Real | Semantic 3D scene understanding |
| [Cityscapes](https://doi.org/10.1109/cvpr.2016.350) | 5,000 | Outdoor | Real | Depth; Semantic 3D scene understanding; World models |
| [NAVSIM](https://doi.org/10.52202/079017-0902) | 115,000 | Outdoor | Real | Embodied action and planning |
| [Ego-Exo4D](https://doi.org/10.1007/s11263-025-02557-6) | 131 | Indoor / outdoor | Real | Camera pose; Dynamic / 4D; Semantic 3D scene understanding; World models; Embodied action and planning |
| [HoIHQ](https://arxiv.org/abs/2512.19020) | 3,000 | Indoor / outdoor | Synthetic | World models |
| [Scene-Decoupled-Video-dataset](https://arxiv.org/abs/2602.06959) | 3,400 | Indoor / outdoor | Synthetic | World models |

## Evaluation targets

Tables 5 and 6 pair each evaluation focus or task with representative datasets, key metrics, and comparison conditions. The website provides both tables as expandable panels.

### Table 5: Evaluation for geometric state strengthening

- **Diverse-input 3D reconstruction:** Geometry with diverse inputs.
- **Efficient 3D reconstruction:** Geometry quality and computation.
- **Robust 3D reconstruction:** Geometry under adverse conditions or outlier views.
- **Streaming and long-sequence 3D reconstruction:** Trajectory drift, retained geometry, and resource use.
- **Dynamic 3D reconstruction:** Dynamic geometry, motion, and segmentation.

### Table 6: Evaluation for downstream geometric-state reuse

- **NVS:** Static-scene NVS; Dynamic-scene NVS.
- **SLAM:** Tracking and mapping; Visual odometry; Relocalization; Place recognition.
- **Semantic 3D scene understanding:** 3D semantic prediction and mapping; Language-based 3D scene reasoning.
- **Geometry-aware world models:** Video-depth prediction; Video generation; Action prediction / rollout selection.
- **Embodied action and planning:** Manipulation; Long-horizon policies / generalization; Driving.

This file is regenerated by `npm run sync` in `awesome-vggt`.
