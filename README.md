<h1 align="center">VGGT for 3D Reconstruction and Beyond: A Survey of Geometric State Strengthening and Its Applications</h1>

<p align="center">
  <a href="https://richardchen225.github.io/">Ruiyang Chen</a><sup>1</sup> &nbsp; <a href="https://sites.google.com/view/feiranlihomepage/home">Feiran Li</a><sup>2</sup> &nbsp; Ruiyang Cheng<sup>1</sup> &nbsp; Jiashuo Yang<sup>1</sup>
  <br>
  <a href="https://fourson.github.io/">Chu Zhou</a><sup>3</sup> &nbsp; <a href="https://gh-home.github.io/">Heng Guo</a><sup>1,*</sup> &nbsp; <a href="https://ci.idm.pku.edu.cn/team/">Boxin Shi</a><sup>4</sup> &nbsp; <a href="https://zhanyuma.cn/">Zhanyu Ma</a><sup>1</sup>
</p>

<p align="center">
  <sup>1</sup>Beijing University of Posts and Telecommunications, Beijing, China<br>
  <sup>2</sup>Independent Researcher<br>
  <sup>3</sup>National Institute of Informatics, Tokyo, Japan<br>
  <sup>4</sup>Peking University, Beijing, China
</p>

<p align="center"><sup>*</sup>Corresponding author: <a href="mailto:guoheng@bupt.edu.cn">Heng Guo</a></p>

<p align="center">
  <a href="https://richardchen225.github.io/vggt_survey/assets/survey_arxiv.pdf"><img alt="Paper" src="https://img.shields.io/badge/Paper-b31b1b?style=flat&amp;logo=arxiv&amp;logoColor=white"></a>
  <a href="https://richardchen225.github.io/vggt_survey/"><img alt="Website" src="https://img.shields.io/badge/Website-2ea44f?style=flat&amp;logo=googlechrome&amp;logoColor=white"></a>
  <a href="#citation"><img alt="BibTeX" src="https://img.shields.io/badge/BibTeX-175D91?style=flat&amp;logo=latex&amp;logoColor=white"></a>
</p>

A literature collection accompanying the survey, organized into geometric-state strengthening and downstream applications.

The survey describes one geometric state with two components: **multi-view geometry latent features**, Z<sub>geo</sub>, and **structured geometric outputs**, R<sub>geo</sub> (cameras, point maps, depth maps, and tracks).

The catalog currently includes **63 strengthening works** and **79 application works**. Updated 2026-09-17.

## Contents

- **[State Strengthening](#state-strengthening)**
  - [S1. Diverse-Input 3D Reconstruction](#category-diverse-inputs)
  - [S2. Efficient 3D Reconstruction](#category-efficient-scalable)
  - [S3. Robust 3D Reconstruction](#category-robust)
  - [S4. Streaming and Long-Sequence 3D Reconstruction](#category-streaming)
  - [S5. Dynamic 3D Reconstruction](#category-dynamic)
- **[State Reuse](#state-reuse)**
  - [R1. Novel View Synthesis](#category-nvs)
  - [R2. SLAM](#category-slam)
  - [R3. Semantic 3D Scene Understanding](#category-semantic)
  - [R4. Geometry-Aware World Models](#category-world-models)
  - [R5. Embodied Action and Planning](#category-embodied)
- **[Citation](#citation)**

<a id="state-strengthening"></a>

## <img src="assets/strengthening.svg" alt="State Strengthening" width="840">

<a id="category-diverse-inputs"></a>

### S1. Diverse-Input 3D Reconstruction

Combines optional camera and depth inputs, geometry-aware sensor fusion, and diverse imaging systems.

<!-- PAPERS:diverse-inputs:START -->

#### S1.1 · Optional camera and depth as input

- **OmniVGGT: Omni-Modality Driven Visual Geometry Grounded Transformer.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://openaccess.thecvf.com/content/CVPR2026/html/Peng_OmniVGGT_Omni-Modality_Driven_Visual_Geometry_Grounded_Transformer_CVPR_2026_paper.html)] [[Code](https://github.com/Livioni/OmniVGGT-official)] [[Project Page](https://livioni.github.io/OmniVGGT-official/)]
- **MapAnything: Universal Feed-Forward Metric 3D Reconstruction.** International Conference on 3D Vision (3DV), 2026. [[Paper](https://doi.org/10.1109/3DV69130.2026.00054)] [[Code](https://github.com/facebookresearch/map-anything)] [[Project Page](https://map-anything.github.io/)]
- **WorldMirror: Universal 3D World Reconstruction with Any-Prior Prompting.** International Conference on Machine Learning (ICML), 2026. [[Paper](https://arxiv.org/abs/2510.10726)] [[Code](https://github.com/Tencent-Hunyuan/HunyuanWorld-Mirror)] [[Project Page](https://3d-models.hunyuan.tencent.com/world/)]

#### S1.2 · Geometry-aware sensor fusion

- **StereoVGGT: A Training-Free Visual Geometry Transformer for Stereo Vision.** arXiv preprint arXiv:2603.29368, 2026. [[Paper](https://arxiv.org/abs/2603.29368)] [[Project Page](https://stereovggt.github.io/)]
- **LiDAR-VGGT: Cross-Modal Coarse-to-Fine Fusion for Globally Consistent and Metric-Scale Dense Mapping.** IEEE Robotics and Automation Letters (RA-L), 2026. [[Paper](https://doi.org/10.1109/LRA.2026.3666387)] [[Code](https://github.com/NorwegianSmokedSalmon/LiDAR-VGGT)]

#### S1.3 · Diverse imaging systems

- **HD-VGGT: High-Resolution Visual Geometry Transformer.** arXiv preprint arXiv:2603.27222, 2026. [[Paper](https://arxiv.org/abs/2603.27222)]
- **Fisheye3R: Adapting Unified 3D Feed-Forward Foundation Models to Fisheye Lenses.** European Conference on Computer Vision (ECCV), 2026. [[Paper](https://arxiv.org/abs/2603.28896)] [[Code](https://github.com/android-xr/fisheye3r)]
- **VGGT-360: Geometry-Consistent Zero-Shot Panoramic Depth Estimation.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://openaccess.thecvf.com/content/CVPR2026/html/Yuan_VGGT-360_Geometry-Consistent_Zero-Shot_Panoramic_Depth_Estimation_CVPR_2026_paper.html)] [[Code](https://github.com/Yuanjiayii/VGGT-360)]
- **PanoVGGT: Feed-Forward 3D Reconstruction from Panoramic Imagery.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://arxiv.org/abs/2603.17571)] [[Code](https://github.com/YijingGuo-June/PanoVGGT)]
- **EventVGGT: Exploring Cross-Modal Distillation for Consistent Event-based Depth Estimation.** European Conference on Computer Vision (ECCV), 2026. [[Paper](https://arxiv.org/abs/2603.09385)] [[Code](https://github.com/yinruiRen/EventVGGT)]
- **RayTun3R: Online Camera Adaptation in 3D Foundation Models.** arXiv preprint arXiv:2607.02711, 2026. [[Paper](https://arxiv.org/abs/2607.02711)]

<!-- PAPERS:diverse-inputs:END -->

---

<a id="category-efficient-scalable"></a>

### S2. Efficient 3D Reconstruction

Reduces the cost of a forward pass through quantization-based compression and efficient network architecture design.

<!-- PAPERS:efficient-scalable:START -->

#### S2.1 · Quantization-based compression

- **Quantized Visual Geometry Grounded Transformer.** International Conference on Learning Representations (ICLR), 2026. [[Paper](https://arxiv.org/abs/2509.21302)] [[Code](https://github.com/wlfeng0509/QuantVGGT)]
- **VersaQ-3D: Architecture Support for Visual Geometry Grounded Transformers via Versatile Quantization.** arXiv preprint arXiv:2601.20317, 2026. [[Paper](https://arxiv.org/abs/2601.20317)]
- **Tail-Aware Post-Training Quantization for 3D Geometry Models.** arXiv preprint arXiv:2602.01741, 2026. [[Paper](https://arxiv.org/abs/2602.01741)]
- **Not All Tasks Quantize Equally: Fisher-Guided Quantization for Visual Geometry Transformer.** arXiv preprint arXiv:2605.15828, 2026. [[Paper](https://arxiv.org/abs/2605.15828)] [[Code](https://github.com/ypzhng/FGQ)]
- **QVGGT: Post-Training Quantized Visual Geometry Grounded Transformer.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://arxiv.org/abs/2605.31124)] [[Code](https://github.com/DDsacu/QVGGT)] [[Project Page](https://ddsacu.github.io/QVGGT/)]

#### S2.2 · Efficient network architecture design

- **FastVGGT: Training-Free Acceleration of Visual Geometry Transformer.** International Conference on Learning Representations (ICLR), 2026. [[Paper](https://arxiv.org/abs/2509.02560)] [[Code](https://github.com/mystorm16/FastVGGT)] [[Project Page](https://mystorm16.github.io/fastvggt/)]
- **LiteVGGT: Boosting Vanilla VGGT via Geometry-Aware Cached Token Merging.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://openaccess.thecvf.com/content/CVPR2026/html/Shu_LiteVGGT_Boosting_Vanilla_VGGT_via_Geometry-aware_Cached_Token_Merging_CVPR_2026_paper.html)] [[Code](https://github.com/GarlicBa/LiteVGGT-repo)] [[Project Page](https://garlicba.github.io/LiteVGGT/)]
- **HTTM: Head-wise Temporal Token Merging for Faster VGGT.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://openaccess.thecvf.com/content/CVPR2026/html/Wang_HTTM_Head-wise_Temporal_Token_Merging_for_Faster_VGGT_CVPR_2026_paper.html)]
- **FlashVGGT: Efficient and Scalable Visual Geometry Transformers with Compressed Descriptor Attention.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://openaccess.thecvf.com/content/CVPR2026/html/Wang_FlashVGGT_Efficient_and_Scalable_Visual_Geometry_Transformers_with_Compressed_Descriptor_CVPR_2026_paper.html)] [[Code](https://github.com/wzpscott/FlashVGGT)] [[Project Page](https://wzpscott.github.io/flashvggt_page/)]
- **Block-Sparse Global Attention for Efficient Multi-View Geometry Transformers.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://openaccess.thecvf.com/content/CVPR2026/html/Wang_Block-Sparse_Global_Attention_for_Efficient_Multi-View_Geometry_Transformers_CVPR_2026_paper.html)] [[Code](https://github.com/brianwang00001/sparse-vggt)] [[Project Page](https://brianwang00001.github.io/sparse-vggt/)]
- **Co-Me: Confidence-Guided Token Merging for Visual Geometric Transformers.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://openaccess.thecvf.com/content/CVPR2026/html/Chen_Co-Me_Confidence_Guided_Token_Merging_for_Visual_Geometric_Transformers_CVPR_2026_paper.html)] [[Code](https://github.com/co-me-tokens/CoMe)] [[Project Page](https://co-me-tokens.github.io/)]
- **AVGGT: Rethinking Global Attention for Accelerating VGGT.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://openaccess.thecvf.com/content/CVPR2026/html/Sun_AVGGT_Rethinking_Global_Attention_for_Accelerating_VGGT_CVPR_2026_paper.html)]
- **Analyzing the Mechanism of Attention Collapse in VGGT from a Dynamics Perspective.** arXiv preprint arXiv:2512.21691, 2025. [[Paper](https://arxiv.org/abs/2512.21691)]
- **HeSS: Head Sensitivity Score for Sparsity Redistribution in VGGT.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://openaccess.thecvf.com/content/CVPR2026/html/Kim_HeSS_Head_Sensitivity_Score_for_Sparsity_Redistribution_in_VGGT_CVPR_2026_paper.html)]
- **VGGT-Ω.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://openaccess.thecvf.com/content/CVPR2026/html/Wang_VGGT-ohm_CVPR_2026_paper.html)] [[Code](https://github.com/facebookresearch/vggt-omega)] [[Project Page](https://vggt-omega.github.io/)]
- **PaceVGGT: Pre-Alternating-Attention Token Pruning for Visual Geometry Transformers.** arXiv preprint arXiv:2605.08371, 2026. [[Paper](https://arxiv.org/abs/2605.08371)]
- **Spark3R: Asymmetric Token Reduction Makes Fast Feed-Forward 3D Reconstruction.** arXiv preprint arXiv:2605.06270, 2026. [[Paper](https://arxiv.org/abs/2605.06270)]
- **Good Token Hunting: A Hitchhiker's Guide to Token Selection for Visual Geometry Transformers.** arXiv preprint arXiv:2605.23892, 2026. [[Paper](https://arxiv.org/abs/2605.23892)] [[Code](https://github.com/zsh2000/gotohunt)] [[Project Page](https://zsh2000.github.io/good-token-hunting.github.io)]
- **RegimeVGGT: Layer-Wise Spatially Preserving Redundancy Removal for Visual Geometry Grounded Transformer.** arXiv preprint arXiv:2606.18439, 2026. [[Paper](https://arxiv.org/abs/2606.18439)]
- **TurboVGGT: Fast Visual Geometry Reconstruction with Adaptive Alternating Attention.** arXiv preprint arXiv:2605.14315, 2026. [[Paper](https://arxiv.org/abs/2605.14315)] [[Project Page](https://turbovggt.github.io/)]
- **SAF3R: Dynamic Sparse Attention for Feed-Forward 3D Reconstruction Transformers.** European Conference on Computer Vision (ECCV), 2026. [[Paper](https://arxiv.org/abs/2607.03612)] [[Code](https://github.com/jndeng/SAF3R)]
- **Lite3R: A Model-Agnostic Framework for Efficient Feed-Forward 3D Reconstruction.** arXiv preprint arXiv:2605.11354, 2026. [[Paper](https://arxiv.org/abs/2605.11354)] [[Code](https://github.com/AIGeeksGroup/Lite3R)] [[Project Page](https://aigeeksgroup.github.io/Lite3R)]

<!-- PAPERS:efficient-scalable:END -->

---

<a id="category-robust"></a>

### S3. Robust 3D Reconstruction

Improves reconstruction in adverse environments and rejects distractors and outlier views.

<!-- PAPERS:robust:START -->

#### S3.1 · Adverse environments

- **DarkVGGT: Seeing Through Darkness Using Thermal Geometry without Daylight Tax.** arXiv preprint arXiv:2606.11326, 2026. [[Paper](https://arxiv.org/abs/2606.11326)] [[Code](https://github.com/phai-lab/DarkVGGT)] [[Project Page](https://darkvggt.github.io/)]
- **Water-VGGT: Leveraging Visual Geometry and Water-Optics for Robust 3D Reconstruction in Underwater Environments.** Ocean Engineering, 2026. [[Paper](https://doi.org/10.1016/j.oceaneng.2026.127044)] [[Code](https://github.com/awhitewhale/watervggt)]
- **Wat3R: Underwater 3D Geometry Learning without Annotations.** European Conference on Computer Vision (ECCV), 2026. [[Paper](https://arxiv.org/abs/2607.08772)] [[Code](https://github.com/LSXI7/Wat3R)]

#### S3.2 · Distractor and outlier rejection

- **Visual Geometry Transformer in the Wild: Distractor-Free 3D Reconstruction.** arXiv preprint arXiv:2606.22787, 2026. [[Paper](https://arxiv.org/abs/2606.22787)] [[Code](https://github.com/Tianbo-Pan/VGTW)] [[Project Page](https://tianbo-pan.github.io/vgt-w/)]
- **Emergent Outlier View Rejection in Visual Geometry Grounded Transformers.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://arxiv.org/abs/2512.04012)] [[Code](https://github.com/cvlab-kaist/RobustVGGT)] [[Project Page](https://cvlab-kaist.github.io/RobustVGGT/)]

<!-- PAPERS:robust:END -->

---

<a id="category-streaming"></a>

### S4. Streaming and Long-Sequence 3D Reconstruction

Covers causal reconstruction and long-sequence reconstruction, including memory management and scale and coordinate consistency.

<!-- PAPERS:streaming:START -->

#### S4.1 · Causal reconstruction

- **Streaming 4D Visual Geometry Transformer.** International Conference on Learning Representations (ICLR), 2026. [[Paper](https://arxiv.org/abs/2507.11539)] [[Code](https://github.com/wzzheng/StreamVGGT)] [[Project Page](https://wzzheng.net/StreamVGGT/)]
- **FrameVGGT: Coherence-Preserving Memory for Bounded Streaming Geometry.** arXiv preprint arXiv:2603.07690, 2026. [[Paper](https://arxiv.org/abs/2603.07690)] [[Code](https://github.com/ZhisongXu/FrameVGGT)]
- **STAC: Plug-and-Play Spatio-Temporal Aware Cache Compression for Streaming 3D Reconstruction.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://openaccess.thecvf.com/content/CVPR2026/html/Wang_STAC_Plug-and-Play_Spatio-Temporal_Aware_Cache_Compression_for_Streaming_3D_Reconstruction_CVPR_2026_paper.html)] [[Code](https://github.com/Rainzor/STAC)] [[Project Page](https://stac-3r.github.io/)]
- **InfiniteVGGT: Visual Geometry Grounded Transformer for Endless Streams.** arXiv preprint arXiv:2601.02281, 2026. [[Paper](https://arxiv.org/abs/2601.02281)] [[Code](https://github.com/AutoLab-SAI-SJTU/InfiniteVGGT)]
- **OVGGT: O(1) Constant-Cost Streaming Visual Geometry Transformer.** European Conference on Computer Vision (ECCV), 2026. [[Paper](https://arxiv.org/abs/2603.05959)] [[Code](https://github.com/VAISR/OVGGT)] [[Project Page](https://vaisr.github.io/OVGGT/)]
- **Evict3R: Training-Free Token Eviction for Memory-Bounded Streaming Visual Geometry Transformers.** arXiv preprint arXiv:2509.17650, 2025. [[Paper](https://arxiv.org/abs/2509.17650)] [[Code](https://github.com/soroush-mim/evict3r)] [[Project Page](https://soroush-mim.github.io/projects/evict3r/)]
- **XStreamVGGT: Extremely Memory-Efficient Streaming Vision Geometry Grounded Transformer with KV Cache Compression.** Society for Information Display Display Week (SID Display Week), 2026. [[Paper](https://arxiv.org/abs/2601.01204)] [[Code](https://github.com/ywh187/XStreamVGGT/)]
- **StreamCacheVGGT: Streaming Visual Geometry Transformers with Robust Scoring and Hybrid Cache Compression.** arXiv preprint arXiv:2604.15237, 2026. [[Paper](https://arxiv.org/abs/2604.15237)]
- **Attention Itself Could Retrieve. RetrieveVGGT: Training-Free Long Context Streaming 3D Reconstruction via Query-Key Similarity Retrieval.** arXiv preprint arXiv:2605.09644, 2026. [[Paper](https://arxiv.org/abs/2605.09644)] [[Code](https://github.com/zzctmd/RetrieveVGGT)]
- **Mamba-VGGT: Persistent Long-Sequence Video Geometry Grounded Transformer via External Sliding Window Mamba Memory.** arXiv preprint arXiv:2605.17478, 2026. [[Paper](https://arxiv.org/abs/2605.17478)]

#### S4.2 · Long-sequence reconstruction

- **LASER: Layer-wise Scale Alignment for Training-Free Streaming 4D Reconstruction.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://arxiv.org/abs/2512.13680)] [[Code](https://github.com/neu-vi/LASER)] [[Project Page](https://neu-vi.github.io/LASER/)]
- **LongStream: Long-Sequence Streaming Autoregressive Visual Geometry.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://openaccess.thecvf.com/content/CVPR2026/html/Cheng_LongStream_Long-Sequence_Streaming_Autoregressive_Visual_Geometry_CVPR_2026_paper.html)] [[Code](https://github.com/3DAgentWorld/LongStream)] [[Project Page](https://3dagentworld.github.io/longstream/)]
- **Anchor3R: Streaming 3D Reconstruction with Transient Anchors for Long-Horizon Visual Mapping.** arXiv preprint arXiv:2606.05035, 2026. [[Paper](https://arxiv.org/abs/2606.05035)]
- **VGGT-Long: Chunk it, Loop it, Align it – Pushing VGGT's Limits on Kilometer-scale Long RGB Sequences.** IEEE International Conference on Robotics and Automation (ICRA), 2026. [[Paper](https://arxiv.org/abs/2507.16443)] [[Code](https://github.com/DengKaiCQ/VGGT-Long)]
- **SwiftVGGT: A Scalable Visual Geometry Grounded Transformer for Large-Scale Scenes.** IEEE/CVF Conference on Computer Vision and Pattern Recognition Findings (CVPR Findings), 2026. [[Paper](https://arxiv.org/abs/2511.18290)] [[Code](https://github.com/Jho-Yonsei/SwiftVGGT)] [[Project Page](https://Jho-Yonsei.github.io/SwiftVGGT/)]
- **Diversity-Aware View Partitioning for Scalable VGGT.** European Conference on Computer Vision (ECCV), 2026. [[Paper](https://arxiv.org/abs/2607.01885)] [[Code](https://github.com/jspark1213/DA-VGGT)] [[Project Page](https://jspark1213.github.io/DA-VGGT/)]
- **VGG-T³: Offline Feed-Forward 3D Reconstruction at Scale.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://openaccess.thecvf.com/content/CVPR2026/html/Elflein_VGG-T3_Offline_Feed-Forward_3D_Reconstruction_at_Scale_CVPR_2026_paper.html)]

<!-- PAPERS:streaming:END -->

---

<a id="category-dynamic"></a>

### S5. Dynamic 3D Reconstruction

Covers dynamic geometry and 4D representation, followed by motion-guided geometry correction.

<!-- PAPERS:dynamic:START -->

#### S5.1 · Dynamic geometry and 4D representation

- **PAGE-4D: Disentangled Pose and Geometry Estimation for VGGT-4D Perception.** International Conference on Learning Representations (ICLR), 2026. [[Paper](https://arxiv.org/abs/2510.17568)] [[Code](https://github.com/kaichen-z/PAGE4D)] [[Project Page](https://page4d.github.io/)]
- **4D-VGGT: A SpatioTemporal Foundation Model for Dynamic Scene Geometry Estimation.** European Conference on Computer Vision (ECCV), 2026. [[Paper](https://arxiv.org/abs/2511.18416)]
- **V-DPM: 4D Video Reconstruction with Dynamic Point Maps.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://arxiv.org/abs/2601.09499)] [[Code](https://github.com/eldar/vdpm)] [[Project Page](https://www.robots.ox.ac.uk/~vgg/research/vdpm/)]
- **Self-Improving 4D Perception via Self-Distillation.** arXiv preprint arXiv:2604.08532, 2026. [[Paper](https://arxiv.org/abs/2604.08532)] [[Code](https://github.com/Self-Evo/SelfEvo)] [[Project Page](https://self-evo.github.io/)]
- **DynamicVGGT: Learning Dynamic Point Maps for 4D Scene Reconstruction in Autonomous Driving.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://openaccess.thecvf.com/content/CVPR2026/html/He_DynamicVGGT_Learning_Dynamic_Point_Maps_for_4D_Scene_Reconstruction_in_CVPR_2026_paper.html)] [[Code](https://github.com/NickHezhuolin/DynamicVGGT)]

#### S5.2 · Motion-guided geometry correction

- **VGGT4D: Mining Motion Cues in Visual Geometry Transformers for 4D Scene Reconstruction.** arXiv preprint arXiv:2511.19971, 2025. [[Paper](https://arxiv.org/abs/2511.19971)] [[Code](https://github.com/3DAgentWorld/VGGT4D)] [[Project Page](https://3dagentworld.github.io/vggt4d/)]
- **Robust 4D Visual Geometry Transformer with Uncertainty-Aware Priors.** arXiv preprint arXiv:2604.09366, 2026. [[Paper](https://arxiv.org/abs/2604.09366)]
- **4DVGGT-D: 4D Visual Geometry Transformer with Improved Dynamic Depth Estimation.** arXiv preprint arXiv:2605.12027, 2026. [[Paper](https://arxiv.org/abs/2605.12027)]

<!-- PAPERS:dynamic:END -->

---

<a id="state-reuse"></a>

## <img src="assets/reuse.svg" alt="State Reuse" width="840">

<a id="category-nvs"></a>

### R1. Novel View Synthesis

Covers direct feed-forward 3D Gaussian reconstruction and 3D Gaussian reconstruction initialized by feed-forward geometry.

<!-- PAPERS:nvs:START -->

#### R1.1 · Direct feed-forward 3D Gaussian reconstruction

- **AnySplat: Feed-Forward 3D Gaussian Splatting from Unconstrained Views.** ACM Transactions on Graphics (TOG), 2025. [[Paper](https://doi.org/10.1145/3763326)] [[Code](https://github.com/InternRobotics/AnySplat)] [[Project Page](https://city-super.github.io/anysplat/)]
- **VGD: Visual Geometry Gaussian Splatting for Feed-Forward Surround-View Driving Reconstruction.** arXiv preprint arXiv:2510.19578, 2025. [[Paper](https://arxiv.org/abs/2510.19578)]
- **SplatWeaver: Learning to Allocate Gaussian Primitives for Generalizable Novel View Synthesis.** arXiv preprint arXiv:2605.07287, 2026. [[Paper](https://arxiv.org/abs/2605.07287)] [[Code](https://github.com/yecongwan/SplatWeaver)] [[Project Page](https://yecongwan.github.io/SplatWeaver/)]
- **G3Splat: Geometrically Consistent Generalizable Gaussian Splatting.** arXiv preprint arXiv:2512.17547, 2025. [[Paper](https://arxiv.org/abs/2512.17547)] [[Code](https://github.com/m80hz/g3splat)] [[Project Page](https://m80hz.github.io/g3splat/)]
- **ReconDrive: Fast Feed-Forward 4D Gaussian Splatting for Autonomous Driving Scene Reconstruction.** arXiv preprint arXiv:2603.07552, 2026. [[Paper](https://arxiv.org/abs/2603.07552)] [[Code](https://github.com/TuojingAI/ReconDrive)]
- **OF³GS: On-the-Fly Feed-Forward 3D Gaussian Splatting from Unposed Images.** arXiv preprint arXiv:2606.03254, 2026. [[Paper](https://arxiv.org/abs/2606.03254)] [[Code](https://github.com/richardchen225/OF3GS_code)] [[Project Page](https://richardchen225.github.io/of3gs/)]

#### R1.2 · 3D Gaussian reconstruction initialized by feed-forward geometry

- **VGGT-X: When VGGT Meets Dense Novel View Synthesis.** arXiv preprint arXiv:2509.25191, 2025. [[Paper](https://arxiv.org/abs/2509.25191)] [[Code](https://github.com/Linketic/VGGT-X)] [[Project Page](https://dekuliutesla.github.io/vggt-x.github.io/)]
- **Gesplat: Robust Pose-Free 3D Reconstruction via Geometry-Guided Gaussian Splatting.** arXiv preprint arXiv:2510.10097, 2025. [[Paper](https://arxiv.org/abs/2510.10097)]
- **VGGS: VGGT-guided Gaussian Splatting for Efficient and Faithful Sparse-View Surface Reconstruction.** AAAI Conference on Artificial Intelligence (AAAI), 2026. [[Paper](https://doi.org/10.1609/aaai.v40i13.38074)]
- **Geo-EVS: Geometry-Conditioned Extrapolative View Synthesis for Autonomous Driving.** arXiv preprint arXiv:2604.07250, 2026. [[Paper](https://arxiv.org/abs/2604.07250)]
- **PanoImager: Geometry-Guided Novel View Synthesis and Reconstruction from Sparse Panoramic Views.** arXiv preprint arXiv:2606.27071, 2026. [[Paper](https://arxiv.org/abs/2606.27071)]
- **SSR-GS: Separating Specular Reflection in Gaussian Splatting for Glossy Surface Reconstruction.** arXiv preprint arXiv:2603.05152, 2026. [[Paper](https://arxiv.org/abs/2603.05152)] [[Project Page](https://gsflyer.github.io/SSR-GS/)]
- **Sparse View Distractor-Free Gaussian Splatting.** arXiv preprint arXiv:2603.01603, 2026. [[Paper](https://arxiv.org/abs/2603.01603)]
- **AsyncEvGS: Asynchronous Event-Assisted Gaussian Splatting for Handheld Motion-Blurred Scenes.** arXiv preprint arXiv:2605.07192, 2026. [[Paper](https://arxiv.org/abs/2605.07192)] [[Project Page](https://openimaginglab.github.io/AsyncEvGS/)]
- **Unpaired RGB-Thermal Gaussian-Splatting Using Visual Geometric Transformers.** MM-SpatialAI Workshop at the IEEE International Conference on Robotics and Automation (ICRA Workshop), 2026. [[Paper](https://arxiv.org/abs/2606.05491)]

<!-- PAPERS:nvs:END -->

---

<a id="category-slam"></a>

### R2. SLAM

Uses geometric state in SLAM systems, visual odometry, and relocalization.

<!-- PAPERS:slam:START -->

#### R2.1 · SLAM systems

- **VGGT-SLAM: Dense RGB SLAM Optimized on the SL(4) Manifold.** Advances in Neural Information Processing Systems (NeurIPS), 2025. [[Paper](https://arxiv.org/abs/2505.12549)] [[Code](https://github.com/MIT-SPARK/VGGT-SLAM)]
- **VGGT-SLAM 2.0: Real-time Dense Feed-forward Scene Reconstruction.** Robotics: Science and Systems (RSS), 2026. [[Paper](https://arxiv.org/abs/2601.19887)] [[Code](https://github.com/MIT-SPARK/VGGT-SLAM)]
- **VGGT-SLAM++.** IEEE/CVF Conference on Computer Vision and Pattern Recognition Workshops (CVPR Workshops), 2026. [[Paper](https://arxiv.org/abs/2604.06830)]
- **EC3R-SLAM: Efficient and Consistent Monocular Dense SLAM with Feed-Forward 3D Reconstruction.** arXiv preprint arXiv:2510.02080, 2025. [[Paper](https://arxiv.org/abs/2510.02080)] [[Code](https://github.com/hulxgit/EC3R-SLAM)] [[Project Page](https://h0xg.github.io/ec3r/)]
- **AIM-SLAM: Dense Monocular SLAM via Adaptive and Informative Multi-View Keyframe Prioritization with Foundation Model.** IEEE International Conference on Robotics and Automation (ICRA), 2026. [[Paper](https://arxiv.org/abs/2603.05097)] [[Project Page](https://aimslam.github.io/)]
- **VGGT-Geo: Probabilistic Geometric Fusion of Visual Geometry Grounded Transformer Priors for Robust Dense Indoor SLAM.** ISPRS International Journal of Geo-Information (IJGI), 2026. [[Paper](https://doi.org/10.3390/ijgi15020085)]
- **VGGT-Mapping: A Mapping System for Robot Navigation based on Visual Geometry Grounded Transformer.** International Conference on Intelligent Robotics and Automatic Control, 2025. [[Paper](https://doi.org/10.1109/IRAC67707.2025.11381128)]
- **Keep It CALM: Toward Calibration-Free Kilometer-Level SLAM with Visual Geometry Foundation Models via an Assistant Eye.** arXiv preprint arXiv:2604.14795, 2026. [[Paper](https://arxiv.org/abs/2604.14795)] [[Code](https://github.com/IRMVLab/CALM)]

#### R2.2 · Visual odometry

- **VGGT-Motion: Motion-Aware Calibration-Free Monocular SLAM for Long-Range Consistency.** International Conference on Machine Learning (ICML), 2026. [[Paper](https://arxiv.org/abs/2602.05508)]
- **HyVGGT-VO: Tightly Coupled Hybrid Dense Visual Odometry with Feed-Forward Models.** arXiv preprint arXiv:2604.02107, 2026. [[Paper](https://arxiv.org/abs/2604.02107)] [[Code](https://github.com/Geneta2580/HyVGGT-VO)] [[Project Page](https://geneta2580.github.io/HyVGGT-VO.io)]
- **Keyframe-Based Feed-Forward Visual Odometry.** arXiv preprint arXiv:2601.16020, 2026. [[Paper](https://arxiv.org/abs/2601.16020)]

#### R2.3 · Relocalization

- **VGGT-MPR: VGGT-Enhanced Multimodal Place Recognition in Autonomous Driving Environments.** arXiv preprint arXiv:2602.19735, 2026. [[Paper](https://arxiv.org/abs/2602.19735)]
- **UniPR-3D: Towards Universal Visual Place Recognition with Visual Geometry Grounded Transformer.** European Conference on Computer Vision (ECCV), 2026. [[Paper](https://arxiv.org/abs/2512.21078)] [[Code](https://github.com/dtc111111/UniPR-3D)]
- **GPA-VGGT: Adapting VGGT to Large Scale Localization by Self-Supervised Learning with Geometry and Physics Aware Loss.** arXiv preprint arXiv:2601.16885, 2026. [[Paper](https://arxiv.org/abs/2601.16885)]
- **Reloc-VGGT: Visual Re-localization with Geometry Grounded Transformer.** arXiv preprint arXiv:2512.21883, 2025. [[Paper](https://arxiv.org/abs/2512.21883)]
- **MultiLoc: Multi-view Guided Relative Pose Regression for Fast and Robust Visual Re-Localization.** arXiv preprint arXiv:2603.27170, 2026. [[Paper](https://arxiv.org/abs/2603.27170)]
- **Reference-Induced Consensus for Selective Posed-Reference Visual Localization.** arXiv preprint arXiv:2607.04722, 2026. [[Paper](https://arxiv.org/abs/2607.04722)] [[Code](https://github.com/SNU-DLLAB/ric_loc)]
- **G2IA: Geometry-Guided Instance-Aware Retrieval and Refinement for Cross-Modal Place Recognition.** arXiv preprint arXiv:2606.15287, 2026. [[Paper](https://arxiv.org/abs/2606.15287)]
- **Unifying UAV Cross-View Geo-Localization via 3D Geometric Perception.** arXiv preprint arXiv:2604.01747, 2026. [[Paper](https://arxiv.org/abs/2604.01747)]
- **GeoLink: A 3D-Aware Framework Towards Better Generalization in Cross-View Geo-Localization.** arXiv preprint arXiv:2604.13183, 2026. [[Paper](https://arxiv.org/abs/2604.13183)]

<!-- PAPERS:slam:END -->

---

<a id="category-semantic"></a>

### R3. Semantic 3D Scene Understanding

Covers 3D semantic prediction and mapping, and language-based 3D scene reasoning.

<!-- PAPERS:semantic:START -->

#### R3.1 · 3D semantic prediction and mapping

- **SegVGGT: Joint 3D Reconstruction and Instance Segmentation from Multi-View Images.** European Conference on Computer Vision (ECCV), 2026. [[Paper](https://arxiv.org/abs/2603.19926)] [[Code](https://github.com/IDEA-Research/SegVGGT)]
- **VGGT-Segmentor: Geometry-Enhanced Cross-View Segmentation.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://openaccess.thecvf.com/content/CVPR2026/html/Gao_VGGT-Segmentor_Geometry-Enhanced_Cross-View_Segmentation_CVPR_2026_paper.html)] [[Code](https://github.com/buaa-colalab/VGGT-S)] [[Project Page](https://bohaozhang007.github.io/VGGT-S-project-page/)]
- **VGGT-Det: Mining VGGT Internal Priors for Sensor-Geometry-Free Multi-View Indoor 3D Object Detection.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://openaccess.thecvf.com/content/CVPR2026/html/Cao_VGGT-Det_Mining_VGGT_Internal_Priors_for_Sensor-Geometry-Free_Multi-View_Indoor_3D_CVPR_2026_paper.html)] [[Code](https://github.com/yangcaoai/VGGT-Det-CVPR2026)]
- **OV3DSeg-VGGT: Open-Vocabulary 3D Segmentation with Visual Geometry-Grounded Transformers.** Visual Informatics, 2026. [[Paper](https://doi.org/10.1016/j.visinf.2026.100311)]
- **VGGT-Occ: Geometry-Grounded and Density-Aware Gated Fusion for 3D Occupancy Prediction.** arXiv preprint arXiv:2605.16911, 2026. [[Paper](https://arxiv.org/abs/2605.16911)]
- **Generalizing Visual Geometry Priors to Sparse Gaussian Occupancy Prediction.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://arxiv.org/abs/2602.21552)] [[Code](https://github.com/JuIvyy/GPOcc)] [[Project Page](https://juivyy.github.io/gpocc/)]
- **Deformable Gaussian Occupancy: Decoupling Rigid and Nonrigid Motion with Factorized Distillation.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://arxiv.org/abs/2605.28587)] [[Code](https://github.com/vita-epfl/DeGO)]
- **Dense Semantic Matching with VGGT Prior.** European Conference on Computer Vision (ECCV), 2026. [[Paper](https://arxiv.org/abs/2509.21263)]
- **MuViSeg: Multi-View Segment Correspondences from Dense Geometry Priors.** arXiv preprint arXiv:2607.17938, 2026. [[Paper](https://arxiv.org/abs/2607.17938)]
- **SceneVGGT: VGGT-Based Online 3D Semantic SLAM for Indoor Scene Understanding and Navigation.** IEEE International Conference on Image Processing (ICIP), 2026. [[Paper](https://arxiv.org/abs/2602.15899)] [[Code](https://github.com/HBVC-AI/SceneVGGT)]
- **VGGT-CD: Training-Free Robust Registration for 3D Change Detection.** arXiv preprint arXiv:2605.16859, 2026. [[Paper](https://arxiv.org/abs/2605.16859)] [[Code](https://github.com/WZ-CS/VGGT-CD)]

#### R3.2 · Language-based 3D scene reasoning

- **MVGGT: Multimodal Visual Geometry Grounded Transformer for Multiview 3D Referring Expression Segmentation.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://openaccess.thecvf.com/content/CVPR2026/html/Wu_MVGGT_Multimodal_Visual_Geometry_Grounded_Transformer_for_Multiview_3D_Referring_CVPR_2026_paper.html)] [[Code](https://github.com/sosppxo/mvggt)] [[Project Page](https://mvggt.github.io/)]
- **4DLangVGGT: 4D Language-Visual Geometry Grounded Transformer.** arXiv preprint arXiv:2512.05060, 2025. [[Paper](https://arxiv.org/abs/2512.05060)] [[Code](https://github.com/hustvl/4DLangVGGT)] [[Project Page](https://hustvl.github.io/4DLangVGGT/)]
- **SpaceMind: Camera-Guided Modality Fusion for Spatial Reasoning in Vision-Language Models.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://arxiv.org/abs/2511.23075)]
- **Think with 3D: Geometric Imagination Grounded Spatial Reasoning from Limited Views.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://arxiv.org/abs/2510.18632)] [[Code](https://github.com/zhangquanchen/3DThinker)]
- **3D-Aware Vision-Language Models Fine-Tuning with Geometric Distillation.** Findings of the Association for Computational Linguistics: EMNLP (Findings of EMNLP), 2025. [[Paper](https://doi.org/10.18653/v1/2025.findings-emnlp.562)] [[Code](https://github.com/kaist-cvml/geometric-distillation)]
- **Distilling 3D Spatial Reasoning into a Lightweight Vision-Language Model with CoT.** arXiv preprint arXiv:2605.09719, 2026. [[Paper](https://arxiv.org/abs/2605.09719)]
- **Dense Reward for Multi-View 3D Reasoning with Global Maps and Local Views.** European Conference on Computer Vision (ECCV), 2026. [[Paper](https://arxiv.org/abs/2606.23557)] [[Project Page](https://dr-mv3d.github.io/)]
- **EAGLE: Episodic Appearance- and Geometry-Aware Memory for Unified 2D–3D Visual Query Localization in Egocentric Vision.** AAAI Conference on Artificial Intelligence (AAAI), 2026. [[Paper](https://arxiv.org/abs/2511.08007)]

<!-- PAPERS:semantic:END -->

---

<a id="category-world-models"></a>

### R4. Geometry-Aware World Models

Uses geometry for video-depth prediction, video generation, and action prediction or rollout selection.

<!-- PAPERS:world-models:START -->

#### R4.1 · Geometry-conditioned video-depth prediction

- **VGGT-World: Transforming VGGT into an Autoregressive Geometry World Model.** European Conference on Computer Vision (ECCV), 2026. [[Paper](https://arxiv.org/abs/2603.12655)] [[Code](https://github.com/SimonSun0810/VGGT-World)]

#### R4.2 · Geometry-conditioned video generation

- **CETCAM: Camera-Controllable Video Generation via Consistent and Extensible Tokenization.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://arxiv.org/abs/2512.19020)] [[Project Page](https://sjtuytc.github.io/CETCam_project_page.github.io/)]
- **CineScene: Implicit 3D as Effective Scene Representation for Cinematic Video Generation.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://arxiv.org/abs/2602.06959)] [[Project Page](https://karine-huang.github.io/CineScene/)]
- **CamGeo: Sparse Camera-Conditioned Image-to-Video Generation with 3D Geometry Priors.** International Conference on Machine Learning (ICML), 2026. [[Paper](https://arxiv.org/abs/2605.30895)]
- **WristWorld: Generating Wrist-Views via 4D World Models for Robotic Manipulation.** arXiv preprint arXiv:2510.07313, 2025. [[Paper](https://arxiv.org/abs/2510.07313)] [[Code](https://github.com/XuWuLingYu/WristWorld)] [[Project Page](https://wrist-world.github.io/)]
- **VideoGPA: Distilling Geometry Priors for 3D-Consistent Video Generation.** International Conference on Machine Learning (ICML), 2026. [[Paper](https://arxiv.org/abs/2601.23286)] [[Code](https://github.com/Hongyang-Du/VideoGPA)] [[Project Page](https://hongyang-du.github.io/VideoGPA-Website/)]
- **V-Dreamer: Automating Robotic Simulation and Trajectory Synthesis via Video Generation Priors.** Workshop on Generative Digital Twins for Real2Sim and Sim2Real Transfer at the IEEE International Conference on Robotics and Automation (ICRA Workshop), 2026. [[Paper](https://arxiv.org/abs/2603.18811)]

#### R4.3 · Geometry-guided action prediction and rollout selection

- **Learning 4D Geometric Priors for Inference-Efficient World Action Models.** arXiv preprint arXiv:2607.05468, 2026. [[Paper](https://arxiv.org/abs/2607.05468)]
- **GEM-4D: Geometry-Enhanced Video World Models for Robot Manipulation.** arXiv preprint arXiv:2605.22882, 2026. [[Paper](https://arxiv.org/abs/2605.22882)] [[Project Page](https://gem-4d.github.io/)]
- **Test-Time Scaling for World Action Models via Zero-Shot Geometric Evaluation.** arXiv preprint arXiv:2607.17454, 2026. [[Paper](https://arxiv.org/abs/2607.17454)]

<!-- PAPERS:world-models:END -->

---

<a id="category-embodied"></a>

### R5. Embodied Action and Planning

Uses geometric state in action policies, planning and trajectory generation, and geometry-aware VLA models.

<!-- PAPERS:embodied:START -->

#### R5.1 · Geometry-enhanced action policies

- **VGGT-DP: Generalizable Robot Control via Vision Foundation Models.** AAAI Conference on Artificial Intelligence (AAAI), 2026. [[Paper](https://arxiv.org/abs/2509.18778)] [[Code](https://github.com/Tigerdwgth/vggt-dp)] [[Project Page](https://tigerdwgth.github.io/vggt-dp/)]
- **R3DP: Real-Time 3D-Aware Policy for Embodied Manipulation.** European Conference on Computer Vision (ECCV), 2026. [[Paper](https://arxiv.org/abs/2603.14498)] [[Code](https://github.com/dazazh/R3DP)] [[Project Page](https://dazazh.github.io/r3dp-project-page/)]
- **VO-DP: Semantic-Geometric Adaptive Diffusion Policy for Vision-Only Robotic Manipulation.** arXiv preprint arXiv:2510.15530, 2025. [[Paper](https://arxiv.org/abs/2510.15530)]
- **Improving Robotic Manipulation with Efficient Geometry-Aware Vision Encoder.** arXiv preprint arXiv:2509.15880, 2025. [[Paper](https://arxiv.org/abs/2509.15880)] [[Code](https://github.com/andvg3/eVGGT)] [[Project Page](https://evggt.github.io/)]
- **OCRA: Object-Centric Learning with 3D and Tactile Priors for Human-to-Robot Action Transfer.** IEEE International Conference on Robotics and Automation (ICRA), 2026. [[Paper](https://arxiv.org/abs/2603.14401)] [[Project Page](https://sressers.github.io/OCRA/)]

#### R5.2 · Geometry-based planning and trajectory generation

- **GraspView: Active Perception Scoring and Best-View Optimization for Robotic Grasping in Cluttered Environments.** arXiv preprint arXiv:2511.04199, 2025. [[Paper](https://arxiv.org/abs/2511.04199)]
- **SyncTwin: Fast Digital Twin Construction and Synchronization for Safe Robotic Manipulation.** arXiv preprint arXiv:2601.09920, 2026. [[Paper](https://arxiv.org/abs/2601.09920)] [[Project Page](https://sync-twin.github.io/)]
- **MG-Nav: Dual-Scale Visual Navigation via Sparse Spatial Memory.** arXiv preprint arXiv:2511.22609, 2025. [[Paper](https://arxiv.org/abs/2511.22609)]

#### R5.3 · Geometry-aware VLA models

- **3D-Mix for VLA: A Plug-and-Play Module for Integrating VGGT-Based 3D Information into Vision-Language-Action Models.** arXiv preprint arXiv:2603.24393, 2026. [[Paper](https://arxiv.org/abs/2603.24393)]
- **GeoAware-VLA: Implicit Geometry Aware Vision-Language-Action Model.** arXiv preprint arXiv:2509.14117, 2025. [[Paper](https://arxiv.org/abs/2509.14117)] [[Project Page](https://alisharey.github.io/GeoAware-VLA/)]
- **GLaD: Geometric Latent Distillation for Vision-Language-Action Models.** arXiv preprint arXiv:2512.09619, 2025. [[Paper](https://arxiv.org/abs/2512.09619)]
- **AugVLA-3D: Depth-Driven Feature Augmentation for Vision-Language-Action Models.** arXiv preprint arXiv:2602.10698, 2026. [[Paper](https://arxiv.org/abs/2602.10698)]
- **ABot-M0: VLA Foundation Model for Robotic Manipulation with Action Manifold Learning.** arXiv preprint arXiv:2602.11236, 2026. [[Paper](https://arxiv.org/abs/2602.11236)] [[Code](https://github.com/amap-cvlab/ABot-Manipulation/tree/ABot-M0)] [[Project Page](https://amap-cvlab.github.io/ABot-Manipulation/)]
- **VGGDrive: Empowering Vision-Language Models with Cross-View Geometric Grounding for Autonomous Driving.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026. [[Paper](https://openaccess.thecvf.com/content/CVPR2026/html/Wang_VGGDrive_Empowering_Vision-Language_Models_with_Cross-View_Geometric_Grounding_for_Autonomous_CVPR_2026_paper.html)] [[Code](https://github.com/WJ-CV/VGGDrive)] [[Project Page](https://WJ-CV.github.io/VGGDrive/)]
- **Understanding the Impact of Geometric Foundation Models on Vision-Language-Action Models.** arXiv preprint arXiv:2605.24642, 2026. [[Paper](https://arxiv.org/abs/2605.24642)]

<!-- PAPERS:embodied:END -->

---

## Citation

```bibtex
@misc{chen2026vggtsurvey,
  title = {{VGGT} for {3D} Reconstruction and Beyond: A Survey of Geometric State Strengthening and Its Applications},
  author = {Chen, Ruiyang and Li, Feiran and Cheng, Ruiyang and Yang, Jiashuo and Zhou, Chu and Guo, Heng and Shi, Boxin and Ma, Zhanyu},
  year = {2026},
  note = {Preprint},
  doi = {10.13140/RG.2.2.14069.33767},
  url = {https://doi.org/10.13140/RG.2.2.14069.33767}
}
```
